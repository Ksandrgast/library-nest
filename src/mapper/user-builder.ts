import { User } from "../entity/user.entity";
import { UserSignUpRequestDto } from "../dto/user-sign-up-request.dto";
import { UserProfileResponseDto } from "../dto/user-profile-response.dto";

export class UserBuilder {
  static buildEntity(dto: UserSignUpRequestDto): User {
    const user = new User();
    user.login = dto.login;
    user.email = dto.email;
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.phone = dto.phone;
    return user;
  }

  static buildProfile(user: User): UserProfileResponseDto {
    return {
      id: user.id,
      login: user.login,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role,
      created: user.created,
    };
  }
}
