import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { UsersController } from "../controller/users.controller";
import { UsersService } from "../service/users.service";
import { UserRepository } from "../repository/user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
  exports: [UsersService, UserRepository], // Если нужно использовать в других модулях
})
export class UsersModule {}
