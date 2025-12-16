import {IsEmail, IsEnum, IsOptional, IsString, Length, Matches} from 'class-validator';
import {CreateUserMessages} from './create-user.message.js';
import {UserType} from '../../types/user.type.js';


export class CreateUserDto {
  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email!: string;

  @IsOptional()
  @IsString({ message: CreateUserMessages.avatarPath.invalidFormat })
  @Matches(/\.(jpg|png)$/i, {
    message: CreateUserMessages.avatarPath.invalidExtension,
  })
  public avatarPath?: string;

  @IsString({ message: CreateUserMessages.firstname.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.firstname.lengthField })
  public firstname!: string;

  @IsString({ message: CreateUserMessages.lastname.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.lastname.lengthField })
  public lastname!: string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessages.password.lengthField })
  public password!: string;

  @IsEnum({ message: CreateUserMessages.type?.invalidFormat ?? 'type is invalid' })
  public type!: UserType;
}
