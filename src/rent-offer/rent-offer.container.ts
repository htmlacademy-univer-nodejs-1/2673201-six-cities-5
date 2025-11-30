import { Container } from 'inversify';
import { RentOfferEntity, RentOfferModel } from './rent-offer.entity.js';
import { types } from '@typegoose/typegoose';
import { Component } from '../types/component.enum.js';
import { DefaultRentOfferService } from './default-rent-offer.service.js';
import {RentOfferService} from './rent-offer.service.interface';
import {RentOfferController} from './rent-offer.controller.js';


export function createRentOfferContainer() {
  const offerContainer = new Container();
  offerContainer.bind<RentOfferService>(Component.RentOfferService).to(DefaultRentOfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<RentOfferEntity>>(Component.RentOfferModel).toConstantValue(RentOfferModel);
  offerContainer.bind <RentOfferController>(Component.RentController).to(RentOfferController).inSingletonScope();
  return offerContainer;
}
