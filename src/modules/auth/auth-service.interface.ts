import {LoginUserDto} from '../user/login-user.dto.js';
import {UserEntity} from '../user/index.js';

export interface AuthService {
  authenticate(user: UserEntity): Promise<string>;
  verify(dto: LoginUserDto): Promise<UserEntity>;
}
