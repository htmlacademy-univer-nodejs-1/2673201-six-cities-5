import {OfferCityType, OfferComfortType, OfferRentType} from '../types/offerRent.type';

export class CreateRentOfferDto {
  public title!: string;
  public description!: string;
  public date!: string;
  public city!: OfferCityType;
  public previewPhoto!: string;
  public photoLiving!: string[];
  public flagPremium!: boolean;
  public flagFavourite!: boolean;
  public rating!: number;
  public typeLiving!: OfferRentType;
  public countRooms!: number;
  public countGuests!: number;
  public price!: number;
  public comforts!: OfferComfortType[];
  public author!: string;
  public countComments!: number;
  public latitude!: number;
  public longitude!: number;
}
