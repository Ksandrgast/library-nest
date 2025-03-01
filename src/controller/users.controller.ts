import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Param
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "../service/users.service";
import { UserSignUpRequestDto } from "../dto/user-sign-up-request.dto";
import { UserSignInRequestDto } from "../dto/user-sign-in-request.dto";
import { UserBuilder } from "../mapper/user-builder";
import { UserProfileMapper } from "../mapper/user-profile-mapper";
import { UserProfileResponseDto } from "../dto/user-profile-response.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post("sign-up")
    @ApiOperation({ summary: "User registration" })
    @ApiResponse({ status: 201, description: "User successfully registered." })
    async signUp(@Body() request: UserSignUpRequestDto): Promise<void> {
        const user = UserBuilder.buildEntity(request);
        await this.userService.signUp(user, request.password);
    }

    @Post("sign-in")
    @ApiOperation({ summary: "User login" })
    @ApiResponse({ status: 200, description: "User successfully logged in." })
    async signIn(@Body() request: UserSignInRequestDto): Promise<void> {
        return this.userService.signIn(request.login, request.password);
    }

    @Get("profile/:username")
    @ApiOperation({ summary: "Get user profile by username" })
    @ApiResponse({ status: 200, description: "User profile retrieved successfully." })
    async getProfile(@Param("username") username: string): Promise<UserProfileResponseDto> {
        const user = await this.userService.getProfileByName(username);
        return UserProfileMapper.toDto(user);
    }

    @Put("update")
    @ApiOperation({ summary: "Update user" })
    @ApiResponse({ status: 200, description: "User updated successfully." })
    async updateUser(@Body() request: UserSignUpRequestDto): Promise<void> {
        const user = UserBuilder.buildEntity(request);
        await this.userService.updateUser(user);
    }
}
