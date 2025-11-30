import { Expose } from 'class-transformer';

export class OfferRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public date!: string;

  @Expose()
  public city!: string;

  @Expose()
  public previewPhoto!: string;

  @Expose()
  public photoLiving!: string[];

  @Expose()
  public flagPremium!: boolean;

  @Expose()
  public flagFavourite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public typeLiving!: string;

  @Expose()
  public countRooms!: number;

  @Expose()
  public countGuests!: number;

  @Expose()
  public price!: number;

  @Expose()
  public comforts!: string[];

  @Expose()
  public author!: string;

  @Expose()
  public countComments!: number;

  @Expose()
  public latitude!: number;

  @Expose()
  public longitude!: number;
}
