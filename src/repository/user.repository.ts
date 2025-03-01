import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async updateUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async resetAllPasswords(): Promise<void> {
    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ password: null }) // Лучше заменить на временный пароль
      .execute();
  }
}
