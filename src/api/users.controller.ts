import { Body, Controller, Get, Put, Param, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UsersService } from "../service/users.service";
import { UserSignUpRequestDto } from "../dto/user-sign-up-request.dto";
import { UserProfileResponseDto } from "../dto/user-profile-response.dto";
import { UserBuilder } from "../mapper/user-builder";
import { UserProfileMapper } from "../mapper/user-profile-mapper";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "../decorators/roles.decorator";
import { UserRole } from "../enums/user-role.enum";
import { UpdateUserRoleDto } from "../dto/update-user-role.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get("profile/:login")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get user profile by username" })
  @ApiResponse({
    status: 200,
    description: "User profile retrieved successfully.",
  })
  async getProfile(
    @Param("login") login: string,
  ): Promise<UserProfileResponseDto> {
    const user = await this.userService.findByLogin(login);
    return UserProfileMapper.toDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put("update")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update user" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiResponse({ status: 200, description: "User updated successfully." })
  async updateUser(@Body() request: UserSignUpRequestDto): Promise<void> {
    const user = UserBuilder.buildEntity(request);
    await this.userService.updateUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all users" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiResponse({
    status: 200,
    description: "All users retrieved successfully.",
  })
  async findAllUsers(): Promise<UserProfileResponseDto[]> {
    const users = await this.userService.findAllUsers();
    return users.map(UserProfileMapper.toDto);
  }

  @Put("role/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Изменение роли пользователя (только для админа)" })
  @ApiResponse({ status: 200, description: "Роль пользователя обновлена." })
  @ApiResponse({ status: 404, description: "Пользователь не найден." })
  async updateUserRole(
    @Param("id") id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<{ success: boolean; message: string }> {
    await this.userService.updateUserRole(id, updateUserRoleDto.role);
    return { success: true, message: "Роль пользователя успешно обновлена." };
  }
}
