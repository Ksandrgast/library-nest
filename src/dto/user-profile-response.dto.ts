import { UserRole } from "../enums/user-role.enum";

export class UserProfileResponseDto {
  id: string;
  login: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone: string;
  created: Date;
}
