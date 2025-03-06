import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PasswordUtils } from "../utils/password.utils";
import { UserRepository } from "../repository/user.repository";
import { User } from "../entity/user.entity";
import { UserSignUpRequestDto } from "../dto/user-sign-up-request.dto";
import { UserSignInRequestDto } from "../dto/user-sign-in-request.dto";
import { UserBuilder } from "../mapper/user-builder";
import { UserRole } from "../enums/user-role.enum";
import { QueryFailedError } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    login: string,
    password: string,
  ): Promise<Omit<User, "password">> {
    const user = await this.userRepository.findByLogin(login);
    if (
      !user ||
      !(await PasswordUtils.comparePassword(password, user.password))
    ) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Исключаем поле password перед возвратом
    const { password: _, ...result } = user;
    return result;
  }

  async signUp(
    request: UserSignUpRequestDto,
  ): Promise<{ success: boolean; token: string }> {
    const existingUser = await this.userRepository.findByLogin(request.login);
    if (existingUser) {
      throw new ConflictException("Пользователь уже существует");
    }

    const user = UserBuilder.buildEntity(request);
    user.password = await PasswordUtils.hashPassword(request.password);
    user.role = UserRole.READER; //присваиваем по умолчанию reader, если нужно - админ повысит уровень

    try {
      const newUser = await this.userRepository.createUser(user);
      return this.generateToken(newUser);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.driverError.code === "23505"
      ) {
        throw new ConflictException(
          "Пользователь с таким логином email или телефоном уже существует.",
        );
      }
      throw error;
    }
  }

  async signIn(
    request: UserSignInRequestDto,
  ): Promise<{ success: boolean; token: string }> {
    const user = await this.userRepository.findByLogin(request.login);
    if (
      !user ||
      !(await PasswordUtils.comparePassword(request.password, user.password))
    ) {
      throw new UnauthorizedException("Неверное имя пользователя или пароль");
    }

    return this.generateToken(user);
  }

  private generateToken(user: User): {
    success: boolean;
    token: string;
  } {
    const payload = {
      sub: user.id,
      login: user.login,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);

    return {
      success: true,
      token,
    };
  }
}
