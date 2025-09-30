import {OfferCityType, OfferComfortType} from './offerRent.type';

export type MockServerData = {
  title: string[];
  description: string[];
  city: OfferCityType[];
  previewPhoto: string[];
  photoLiving: string[];
  comforts: OfferComfortType[];
  author: string[];
  latitude: number[];
  longitude: number[];
}
