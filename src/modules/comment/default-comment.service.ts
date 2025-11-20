import { inject, injectable } from 'inversify';
import { CommentService } from './comment-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './create-comment.dto.js';
import { Component } from '../../types/component.enum.js';
import { RentOfferEntity } from '../../rent-offer/rent-offer.entity.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>,

    @inject(Component.RentOfferModel)
    private readonly rentOfferModel: types.ModelType<RentOfferEntity>,
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    const comments = await this.commentModel
      .find({ offerId: dto.offerId })
      .exec();

    const countComments = comments.length;
    const rating = comments.reduce((sum, c) => sum + c.rating, 0) / countComments;

    await this.rentOfferModel
      .findByIdAndUpdate(dto.offerId, {
        countComments,
        rating,
      })
      .exec();

    return comment.populate('userId');
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ offerId })
      .populate('userId')
      .exec();
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({ offerId })
      .exec();
    return result.deletedCount ?? 0;
  }
}
