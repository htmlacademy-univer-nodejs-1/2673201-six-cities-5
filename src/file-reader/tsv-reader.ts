import {readFileSync} from 'node:fs';
import {FileReader} from './file-reader.js';
import {OfferCityType, OfferComfortType, OfferRent, OfferRentType} from '../types/offerRent.type';


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
        city: city as OfferCityType,
        previewPhoto: String(previewPhoto),
        photoLiving: photoLiving.split(';').map((photo) => photo.trim()),
        flagPremium: flagPremium.trim().toLowerCase() === 'true',
        flagFavourite: flagFavourite.trim().toLowerCase() === 'true',
        rating: parseFloat(rating),
        typeLiving: typeLiving as OfferRentType,
        countRooms: Number(countRooms),
        countGuests: Number(countGuests),
        price: Number(price),
        comforts: comforts.split(';').map((c) => c.trim()).filter(Boolean).map((c) => c as OfferComfortType),
        author: String(author),
        countComments: Number(countComments),
        latitude: Number(latitude),
        longitude: Number(longitude),
      } as OfferRent));
  }
}
