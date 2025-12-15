import {IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsMongoId, IsNumber, IsString, Max, MaxLength, Min, MinLength,} from 'class-validator';
import { OfferCityType, OfferComfortType, OfferRentType } from '../types/offerRent.type.js';
import { CreateRentOfferValidationMessage } from './create-rent-offer.messages.js';

export class CreateRentOfferDto {
  @MinLength(10, { message: CreateRentOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateRentOfferValidationMessage.title.maxLength })
  public title!: string;

  @MinLength(20, { message: CreateRentOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateRentOfferValidationMessage.description.maxLength })
  public description!: string;

  @IsDateString({}, { message: CreateRentOfferValidationMessage.date.invalidFormat })
  public date!: string;

  @IsEnum(Object, { message: CreateRentOfferValidationMessage.city.invalidFormat })
  public city!: OfferCityType;

  @IsString({ message: CreateRentOfferValidationMessage.previewPhoto.invalidFormat })
  @MaxLength(256, { message: CreateRentOfferValidationMessage.previewPhoto.maxLength })
  public previewPhoto!: string;

  @IsArray({ message: CreateRentOfferValidationMessage.photoLiving.invalidFormat })
  @IsString({ each: true, message: CreateRentOfferValidationMessage.photoLiving.itemInvalidFormat })
  @MaxLength(256, { each: true, message: CreateRentOfferValidationMessage.photoLiving.itemMaxLength })
  public photoLiving!: string[];

  @IsBoolean({ message: CreateRentOfferValidationMessage.flagPremium.invalidFormat })
  public flagPremium!: boolean;

  @IsBoolean({ message: CreateRentOfferValidationMessage.flagFavourite.invalidFormat })
  public flagFavourite!: boolean;

  @IsEnum(Object, { message: CreateRentOfferValidationMessage.typeLiving.invalidFormat })
  public typeLiving!: OfferRentType;

  @IsInt({ message: CreateRentOfferValidationMessage.countRooms.invalidFormat })
  @Min(1, { message: CreateRentOfferValidationMessage.countRooms.minValue })
  @Max(8, { message: CreateRentOfferValidationMessage.countRooms.maxValue })
  public countRooms!: number;

  @IsInt({ message: CreateRentOfferValidationMessage.countGuests.invalidFormat })
  @Min(1, { message: CreateRentOfferValidationMessage.countGuests.minValue })
  @Max(10, { message: CreateRentOfferValidationMessage.countGuests.maxValue })
  public countGuests!: number;

  @IsInt({ message: CreateRentOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateRentOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateRentOfferValidationMessage.price.maxValue })
  public price!: number;

  @IsArray({ message: CreateRentOfferValidationMessage.comforts.invalidFormat })
  @IsEnum(Object, { each: true, message: CreateRentOfferValidationMessage.comforts.itemInvalidFormat })
  public comforts!: OfferComfortType[];

  @IsMongoId({ message: CreateRentOfferValidationMessage.author.invalidId })
  public author!: string;

  @IsNumber({}, { message: CreateRentOfferValidationMessage.latitude.invalidFormat })
  @Min(-90, { message: CreateRentOfferValidationMessage.latitude.minValue })
  @Max(90, { message: CreateRentOfferValidationMessage.latitude.maxValue })
  public latitude!: number;

  @IsNumber({}, { message: CreateRentOfferValidationMessage.longitude.invalidFormat })
  @Min(-180, { message: CreateRentOfferValidationMessage.longitude.minValue })
  @Max(180, { message: CreateRentOfferValidationMessage.longitude.maxValue })
  public longitude!: number;
}
