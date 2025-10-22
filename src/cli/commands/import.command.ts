import { Command } from './command.interface.js';
import {TSVFileReader} from '../../file-reader/tsv-file-reader.js';
import {getErrorMessage} from '../../helpers/common.js';
import {UserService} from '../../modules/user/user-service.interface.js';
import {DatabaseClient, MongoDatabaseClient} from '../../database-client/index.js';
import {Logger} from '../../logger/index.js';
import {ConsoleLogger} from '../../logger/console.logger.js';
import {DefaultUserService} from '../../modules/user/default-user.service.js';
import {DefaultRentOfferService} from '../../rent-offer/default-rent-offer.service.js';
import {UserModel} from '../../modules/user/user.entity.js';
import {RentOfferModel} from '../../rent-offer/rent-offer.entity.js';
import {createOffer} from '../../helpers/offer.js';
import {getMongoURI} from '../../helpers/database.js';
import {DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD} from './command.const.js';
import {OfferRent} from '../../types/offerRent.type.js';
import {RentOfferService} from '../../rent-offer/rent-offer.service.interface';

export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: RentOfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt?: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultRentOfferService(this.logger, RentOfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: OfferRent) {

    const user = await this.userService.findOrCreate({
      name: offer.author,
      email: `${offer.author.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      avatar: '',
      typeUser: 'обычный',
      password: DEFAULT_USER_PASSWORD
    }, this.salt!);

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      date: offer.date,
      city: offer.city,
      previewPhoto: offer.previewPhoto,
      photoLiving: offer.photoLiving,
      flagPremium: offer.flagPremium,
      flagFavourite: offer.flagFavourite,
      rating: offer.rating,
      typeLiving: offer.typeLiving,
      countRooms: offer.countRooms,
      countGuests: offer.countGuests,
      price: offer.price,
      comforts: offer.comforts,
      author: user.id.toString(),
      countComments: offer.countComments,
      latitude: offer.latitude,
      longitude: offer.longitude
    });
  }

  public getName(): string {
    return '--import';
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
