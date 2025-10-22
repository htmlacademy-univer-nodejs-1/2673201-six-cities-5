import { injectable } from 'inversify';
import { UserDocument, UserModel } from './user.model.js';
import { CreateUserDto } from './create-user.dto.js';

@injectable()
export class UserService {
  async findByEmail(email: string): Promise<UserDocument | null> {
    return UserModel.findOne({ email }).exec();
  }

  async create(dto: CreateUserDto, salt: string): Promise<UserDocument> {
    const user = new UserModel({
      email: dto.email,
      name: dto.name,
      avatar: dto.avatar,
      type: dto.typeUser,
      password: '',
    });
    user.setPassword(dto.password, salt);
    return user.save();
  }
}
