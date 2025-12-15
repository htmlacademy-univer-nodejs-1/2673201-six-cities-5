import { Expose } from 'class-transformer';

export class CommentRdo {
  @Expose()
  public id!: string;

  @Expose()
  public text!: string;

  @Expose()
  public rating!: number;

  @Expose()
  public createdAt!: string;

  @Expose()
  public userId!: string;

  @Expose()
  public offerId!: string;
}
