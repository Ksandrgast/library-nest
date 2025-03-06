import { IsEnum, IsNotEmpty } from "class-validator";
import { UserRole } from "../enums/user-role.enum";

export class UpdateUserRoleDto {
  @IsNotEmpty()
  @IsEnum(UserRole, {
    message: "Роль должна быть одной из: READER, LIBRARIAN, ADMIN",
  })
  role: UserRole;
}
