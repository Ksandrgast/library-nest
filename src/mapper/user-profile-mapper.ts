import { User } from "../entity/user.entity";
import { UserProfileResponseDto } from "../dto/user-profile-response.dto";

export class UserProfileMapper {
    static toDto(user: User): UserProfileResponseDto {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            created: user.created,
        };
    }
}
