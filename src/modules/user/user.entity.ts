import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import {User} from '../../types/user.type';
import {createSHA256} from '../../helpers/hash.js';

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements User {
  get password(): string {
    return this._password || '';
  }

  set password(value: string) {
    this._password = value;
  }

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false, default: '' })
  public avatar: string;

  @prop({ required: true, default: '' })
  public name: string;

  @prop({ required: true})
  public typeUser: string;

  @prop({ required: true, default: '' })
  private _password?: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatar = userData.avatar || '';
    this.name = userData.name;
    this.typeUser = userData.typeUser;
  }

  public setPassword(password: string, salt: string) {
    this._password = createSHA256(password, salt);
  }

  public getPassword() {
    return this._password;
  }
}

export const UserModel = getModelForClass(UserEntity);
