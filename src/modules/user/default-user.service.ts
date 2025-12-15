import { injectable } from 'inversify';
import { UserModel } from './user.entity.js';
import { CreateUserDto } from './create-user.dto.js';
import { UserService } from './user-service.interface.js';

@injectable()
export class DefaultUserService implements UserService {
  async findByEmail(email: string) {
    return UserModel.findOne({ email }).exec();
  }

  async create(dto: CreateUserDto, salt: string) {
    const user = new UserModel({
      email: dto.email,
      name: dto.firstname,
      avatar: dto.avatarPath,
      type: dto.type,
      password: '',
    });

    user.setPassword(dto.password, salt);
    return user.save();
  }

  async findOrCreate(dto: CreateUserDto, salt: string) {
    const exists = await this.findByEmail(dto.email);
    if (exists) {
      return exists;
    }
    return this.create(dto, salt);
  }

  async updateById(userId: string, dto: any) {
    return UserModel.findByIdAndUpdate(userId, dto, { new: true }).exec();
  }
}
