import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import { User } from "../entity/user.entity";
import { PasswordUtils } from "../utils/password.utils";

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(user: User, password: string): Promise<void> {
    user.password = await PasswordUtils.hashPassword(password);
    await this.userRepository.createUser(user);
  }

  async signIn(username: string, password: string): Promise<void> {
    const user = await this.userRepository.findByUsername(username);

    if (!user ||!(await PasswordUtils.comparePassword(password, user.password))) {
      throw new UnauthorizedException("Invalid credentials");
    }
  }

  async getProfileByName(username: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);
    if (!user)
      throw new NotFoundException("User not found");
    return user;
  }

  async updateUser(user: User): Promise<User> {
    return this.userRepository.updateUser(user);
  }
}
