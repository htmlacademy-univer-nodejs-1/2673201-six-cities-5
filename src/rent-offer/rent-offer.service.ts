import { DocumentType } from '@typegoose/typegoose';
import { RentOfferEntity, RentOfferModel } from './rent-offer.entity.js';
import {OfferRent} from '../types/offerRent.type';
import {injectable} from 'inversify';

@injectable()
export class RentOfferService {
  public async create(data: Partial<OfferRent>): Promise<DocumentType<RentOfferEntity>> {
    const rentOffer = new RentOfferEntity(data as OfferRent);
    return RentOfferModel.create(rentOffer);
  }

  public async findById(id: string): Promise<DocumentType<RentOfferEntity> | null> {
    return RentOfferModel.findById(id).populate('author').exec();
  }

  public async findByCity(city: string): Promise<DocumentType<RentOfferEntity>[]> {
    return RentOfferModel.find({ city }).populate('author').exec();
  }
}
