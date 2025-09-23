import {readFileSync} from 'node:fs';
import {FileReader} from './file-reader.js';
import {OfferRent, OfferRentType} from '../types/offerRent.type';


export class TsvReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly fileName: string
  ) {
  }

  public read(): void {
    this.rawData = readFileSync(this.fileName, {encoding: 'utf8'});
  }

  public toArray(): OfferRent[] {
    if (!this.rawData) {
      throw new Error('Cant read the file');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, date, city, previewPhoto, photoLiving, flagPremium, flagFavourite, rating, typeLiving, countRooms, countGuests, price, comforts, author, countComments, latitude, longitude,]) => ({
        title: String(title),
        description: String(description),
        date: String(date),
        city: String(city),
        previewPhoto: String(previewPhoto),
        photoLiving: photoLiving.split(';').map((photo) => photo.trim()),
        flagPremium: flagPremium.toLowerCase() ? flagPremium.toLowerCase() : false,
        flagFavourite: flagFavourite.toLowerCase() ? flagFavourite.toLowerCase() : false,
        rating: Number.parseInt(rating, 10),
        typeLiving: typeLiving as OfferRentType,
        countRooms: Number(countRooms),
        countGuests: Number(countGuests),
        price: Number(price),
        comforts: comforts.split(';').map((comfort) => comfort.trim()),
        author: String(author),
        countComments: Number(countComments),
        latitude: Number(latitude),
        longitude: Number(longitude),
      } as OfferRent));
  }
}
