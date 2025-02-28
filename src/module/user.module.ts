import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from "../entity/user.entity";
import {DefaultUsersService} from "../service/impl/default-users.service";
import {UsersController} from "../api/users.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    providers: [
        {
            provide: 'UsersService',
            useClass: DefaultUsersService,
        },
        DefaultUsersService,
    ],
    controllers: [UsersController],
})

export class UsersModule {
}
