import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import {OfferCityType, OfferComfortType, OfferRent, OfferRentType} from '../types/offerRent.type';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface RentOfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'rent-offers'
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class RentOfferEntity extends defaultClasses.TimeStamps implements OfferRent {
  @prop({ required: true, minlength: 10, maxlength: 100 })
  public title: string;

  @prop({ required: true, minlength: 20, maxlength: 1024 })
  public description: string;

  @prop({ required: true })
  public date: string;

  @prop({
    required: true,
    enum: ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf']
  })
  public city: OfferCityType;

  @prop({ required: true })
  public previewPhoto: string;

  @prop({
    type: () => [String],
    required: true
  })
  public photoLiving: string[];

  @prop({ required: true, default: false })
  public flagPremium: boolean;

  @prop({ required: true, default: false })
  public flagFavourite: boolean;

  @prop({ required: true, min: 0, max: 5, default: 0 })
  public rating: number;

  @prop({
    required: true,
    enum: ['apartment', 'house', 'room', 'hotel']
  })
  public typeLiving: OfferRentType;

  @prop({ required: true, min: 1, max: 8 })
  public countRooms: number;

  @prop({ required: true, min: 1, max: 10 })
  public countGuests: number;

  @prop({ required: true, min: 100, max: 100000 })
  public price: number;

  @prop({
    type: () => [String],
    required: true,
    enum: ['Breakfast', 'Air conditioning', 'Laptop friendly workspace', 'Baby seat', 'Washer', 'Towels', 'Fridge']
  })
  public comforts: OfferComfortType[];

  @prop({ required: true })
  public author: string;

  @prop({ required: true, default: 0 })
  public countComments: number;

  @prop({ required: true })
  public latitude: number;

  @prop({ required: true })
  public longitude: number;

  constructor(offerData: OfferRent) {
    super();

    this.title = offerData.title;
    this.description = offerData.description;
    this.date = offerData.date;
    this.city = offerData.city;
    this.previewPhoto = offerData.previewPhoto;
    this.photoLiving = offerData.photoLiving;
    this.flagPremium = offerData.flagPremium;
    this.flagFavourite = offerData.flagFavourite;
    this.rating = 0;
    this.typeLiving = offerData.typeLiving;
    this.countRooms = offerData.countRooms;
    this.countGuests = offerData.countGuests;
    this.price = offerData.price;
    this.comforts = offerData.comforts;
    this.author = offerData.author;
    this.countComments = 0;
    this.latitude = offerData.latitude;
    this.longitude = offerData.longitude;
  }
}

export const RentOfferModel = getModelForClass(RentOfferEntity);
