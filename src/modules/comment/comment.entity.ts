import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';
import {RentOfferEntity} from '../../rent-offer/rent-offer.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public text?: string;

  @prop({
    ref: RentOfferEntity,
    required: true
  })
  public offerId?: Ref<RentOfferEntity>;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId?: Ref<UserEntity>;

  @prop({ required: true, min: 1, max: 5 })
  public rating!: number;

}

export const CommentModel = getModelForClass(CommentEntity);
