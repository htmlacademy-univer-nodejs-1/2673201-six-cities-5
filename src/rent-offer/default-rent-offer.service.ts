import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { RentOfferEntity } from './rent-offer.entity.js';
import { CreateRentOfferDto } from './create-rent-offer.dto.js';
import {RentOfferService} from './rent-offer.service.interface';
import {Component} from '../types/component.enum.js';
import {Logger} from '../logger';
import {UpdateOfferDto} from './update-offer.dto';
import {SortType} from '../types/sort-type.enum.js';
import {DEFAULT_OFFER_COUNT} from './offer.constant.js';

@injectable()
export class DefaultRentOfferService implements RentOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.RentOfferModel) private readonly rentOfferModel: types.ModelType<RentOfferEntity>
  ) {}

  public async create(dto: CreateRentOfferDto): Promise<DocumentType<RentOfferEntity>> {
    const result = await this.rentOfferModel.create(dto);
    this.logger.info(`New rent offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<RentOfferEntity> | null> {
    return this.rentOfferModel.findById(offerId).populate('userId', 'offers').exec();
  }

  public async find(limit?: number): Promise<DocumentType<RentOfferEntity>[]> {
    const query = this.rentOfferModel
      .find()
      .sort({ createdAt: -1 })
      .populate(['userId']);

    if (limit) {
      query.limit(limit);
    }

    return query.exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<RentOfferEntity> | null> {
    return this.rentOfferModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<RentOfferEntity> | null> {
    return this.rentOfferModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.rentOfferModel
      .exists({_id: documentId})) !== null;
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<RentOfferEntity> | null> {
    return this.rentOfferModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }

  public async findNew(count: number = DEFAULT_OFFER_COUNT): Promise<DocumentType<RentOfferEntity>[]> {
    return this.rentOfferModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(count)
      .exec();
  }

  public async findDiscussed(count: number = DEFAULT_OFFER_COUNT): Promise<DocumentType<RentOfferEntity>[]> {
    return this.rentOfferModel
      .find()
      .sort({ countComments: SortType.Down })
      .limit(count)
      .exec();
  }
}
