import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserSignUpRequestDto } from "../dto/user-sign-up-request.dto";
import { UserSignInRequestDto } from "../dto/user-sign-in-request.dto";
import { AuthService } from "../service/auth.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  @ApiOperation({ summary: "User registration" })
  @ApiResponse({ status: 201, description: "User successfully registered." })
  async signUp(
    @Body() request: UserSignUpRequestDto,
  ): Promise<{ success: boolean; token: string }> {
    return this.authService.signUp(request);
  }

  @Post("sign-in")
  @ApiOperation({ summary: "User login" })
  @ApiResponse({ status: 200, description: "User successfully logged in." })
  async signIn(
    @Body() request: UserSignInRequestDto,
  ): Promise<{ success: boolean; token: string}> {
    return this.authService.signIn(request);
  }
}
