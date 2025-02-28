import {Body, Controller, Get, Post, Put,} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {DefaultUsersService} from "../service/impl/default-users.service";
import {UserSignUpRequestDto} from "../dto/user-sign-up-request.dto";
import {UserSignInRequestDto} from "../dto/user-sign-in-request.dto";
import {UserBuilder} from "../mapper/user-builder";
import {User} from "../entity/user.entity";

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: DefaultUsersService) {
    }

    @Post('sign-up')
    @ApiOperation({summary: 'User registration'})
    @ApiResponse({status: 201, description: 'User successfully registered.'})
    async signUp(@Body() request: UserSignUpRequestDto): Promise<void> {

        UserBuilder.buildEntity(request)

        await this.usersService.signUp(new User(), request.password);
    }

    @Post('sign-in')
    @ApiOperation({summary: 'User login'})
    @ApiResponse({status: 200, description: 'User successfully logged in.'})
    async signIn(@Body() request: UserSignInRequestDto): Promise<void> {

        return this.usersService.signIn(request.login, request.password);
    }

    @Get('profile')
    @ApiOperation({summary: 'Get user profile'})
    @ApiResponse({status: 200, description: 'User profile retrieved successfully.'})
    async getProfile(): Promise<void> {

        UserBuilder.buildProfile(new User());
    }

    @Put('update')
    @ApiOperation({summary: 'Update user'})
    @ApiResponse({status: 200, description: 'User updated successfully.'})
    async updateUser(@Body() request: String): Promise<void> {

        await this.usersService.updateUser(new User());
    }
}
