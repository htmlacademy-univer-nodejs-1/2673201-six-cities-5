import { DocumentType } from '@typegoose/typegoose';
import { RentOfferEntity } from './rent-offer.entity.js';
import {UpdateOfferDto} from './update-offer.dto.js';
import {CreateRentOfferDto} from './create-rent-offer.dto';

export interface RentOfferService {
  create(dto: CreateRentOfferDto): Promise<DocumentType<RentOfferEntity>>;
  findById(id: string): Promise<DocumentType<RentOfferEntity> | null>;
  find(): Promise<DocumentType<RentOfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<RentOfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<RentOfferEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<RentOfferEntity> | null>;
  findNew(count: number): Promise<DocumentType<RentOfferEntity>[]>;
  findDiscussed(count: number): Promise<DocumentType<RentOfferEntity>[]>;
  exists(documentId: string): Promise<boolean>;
}
