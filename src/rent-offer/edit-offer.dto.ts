export class EditOfferDto {
  public id!: string;
  public title!: string;
  public description!: string;
  public date!: string;
  public city!: string;
  public previewPhoto!: string;
  public photoLiving!: string[];
  public flagPremium!: boolean;
  public flagFavourite!: boolean;
  public rating!: number;
  public typeLiving!: string;
  public countRooms!: number;
  public countGuests!: number;
  public price!: number;
  public comforts!: string[];
  public author!: string;
  public countComments!: number;
  public latitude!: number;
  public longitude!: number;
}
