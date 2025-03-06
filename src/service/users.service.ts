import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import { User } from "../entity/user.entity";
import { UserRole } from "../enums/user-role.enum";

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByLogin(login: string): Promise<User> {
    const user = await this.userRepository.findByLogin(login);
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async updateUser(user: User): Promise<User> {
    return this.userRepository.updateUser(user);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async updateUserRole(userId: string, newRole: UserRole): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }

    user.role = newRole;
    await this.userRepository.updateUser(user);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.deleteUser(id);
  }
}
