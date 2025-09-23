export type OfferRentType = 'apartment' | 'house' | 'room' | 'hotel';

export interface OfferRent {
  title: string;
  description: string;
  date: string;
  city: string;
  previewPhoto: string;
  photoLiving: string[];
  flagPremium: boolean;
  flagFavourite: boolean;
  rating: number;
  typeLiving: OfferRentType;
  countRooms: number;
  countGuests: number;
  price: number;
  comforts: string[];
  author: string;
  countComments: number;
  latitude: number;
  longitude: number;
}
