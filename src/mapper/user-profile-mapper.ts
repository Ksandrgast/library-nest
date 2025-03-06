import { User } from "../entity/user.entity";
import { UserProfileResponseDto } from "../dto/user-profile-response.dto";

export class UserProfileMapper {
  static toDto(user: User): UserProfileResponseDto {
    return {
      id: user.id,
      login: user.login,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      phone: user.phone,
      created: user.created,
    };
  }
}
