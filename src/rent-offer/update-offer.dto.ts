import {OfferRentType} from '../types/offerRent.type.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public image?: string;
  public type?: OfferRentType;
  public price?: number;
}
