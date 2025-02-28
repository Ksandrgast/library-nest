import {IsNotEmpty} from "class-validator";

export class UserSignInRequestDto {

    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    password: string;
}
