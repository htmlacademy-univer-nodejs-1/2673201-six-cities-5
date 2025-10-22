import { DocumentType } from '@typegoose/typegoose';
import { RentOfferEntity } from './rent-offer.entity.js';
import { OfferRent } from '../types/offerRent.type.js';

export interface RentOfferService {
  create(dto: OfferRent): Promise<DocumentType<RentOfferEntity>>;
  findById(id: string): Promise<DocumentType<RentOfferEntity> | null>;
}
