import { OfferRent, OfferCityType, OfferRentType, OfferComfortType } from '../types/offerRent.type.js';

const COMFORTS: readonly OfferComfortType[] = [
  'Breakfast','Air conditioning','Laptop friendly workspace','Baby seat','Washer','Towels','Fridge'
] as const;

const isComfort = (v: string): v is OfferComfortType =>
  (COMFORTS as readonly string[]).includes(v);

export function createOffer(offerData: string): OfferRent {
  const [
    title,
    description,
    date,
    city,
    previewPhoto,
    photoLiving,
    flagPremium,
    flagFavourite,
    rating,
    typeLiving,
    countRooms,
    countGuests,
    price,
    comforts,
    author,
    countComments,
    latitude,
    longitude
  ] = offerData.replace('\n', '').split('\t');

  return {
    title: String(title),
    description: String(description),
    date: String(date),
    city: city as OfferCityType,
    previewPhoto: String(previewPhoto),
    photoLiving: String(photoLiving).split(';').map((s) => s.trim()).filter(Boolean),
    flagPremium: String(flagPremium).trim().toLowerCase() === 'true',
    flagFavourite: String(flagFavourite).trim().toLowerCase() === 'true',
    rating: parseFloat(rating),
    typeLiving: typeLiving as OfferRentType,
    countRooms: Number.parseInt(countRooms, 10),
    countGuests: Number.parseInt(countGuests, 10),
    price: Number.parseInt(price, 10),
    comforts: String(comforts).split(';').map((s) => s.trim()).filter(isComfort),
    author: String(author),
    countComments: Number.parseInt(countComments, 10),
    latitude: Number.parseFloat(latitude),
    longitude: Number.parseFloat(longitude),
  };
}
