import { Container } from 'inversify';
import { RentOfferEntity, RentOfferModel } from './rent-offer.entity.js';
import { types } from '@typegoose/typegoose';
import { Component } from '../types/component.enum.js';
import { DefaultRentOfferService } from './default-rent-offer.service.js';
import {RentOfferService} from './rent-offer.service.interface';


export function createRentOfferContainer() {
  const offerContainer = new Container();
  offerContainer.bind<RentOfferService>(Component.RentOfferService).to(DefaultRentOfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<RentOfferEntity>>(Component.RentOfferModel).toConstantValue(RentOfferModel);
  return offerContainer;
}
