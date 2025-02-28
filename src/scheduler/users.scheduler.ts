import {Injectable, Logger} from "@nestjs/common";
import {Cron} from "@nestjs/schedule";
import {DefaultUsersService} from "../service/impl/default-users.service";

@Injectable()
export class UsersScheduler {

    private readonly logger = new Logger(UsersScheduler.name);

    constructor(private readonly usersService: DefaultUsersService) {
    }

    @Cron('0 */10 * * * *')
    async resetUsersPassword() {

        this.logger.log('Resetting users password...');
        await this.usersService.resetUsersPassword();
        this.logger.log('Users password reset successfully');
    }
}
