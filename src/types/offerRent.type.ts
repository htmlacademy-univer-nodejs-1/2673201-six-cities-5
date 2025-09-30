export type OfferRentType = 'apartment' | 'house' | 'room' | 'hotel';

export type OfferComfortType = 'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge';

export type OfferCityType = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export interface OfferRent {
  title: string;
  description: string;
  date: string;
  city: OfferCityType;
  previewPhoto: string;
  photoLiving: string[];
  flagPremium: boolean;
  flagFavourite: boolean;
  rating: number;
  typeLiving: OfferRentType;
  countRooms: number;
  countGuests: number;
  price: number;
  comforts: OfferComfortType[];
  author: string;
  countComments: number;
  latitude: number;
  longitude: number;
}
