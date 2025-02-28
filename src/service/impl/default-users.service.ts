import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {UsersService} from "../users.service";
import {User} from "../../entity/user.entity";
import {PasswordUtils} from "../../utils/password.utils";

@Injectable()
export class DefaultUsersService implements UsersService {

    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {
    }

    async signUp(user: User, password: string): Promise<void> {

        try {
            user.password = await PasswordUtils.hashPassword(password);

            this.usersRepository.create(user);
        } catch (e) {
            throw new Error('An unexpected error occurred');
        }
    }

    async signIn(username: string, password: string): Promise<void> {

        const user = await this.usersRepository.findOne({
            where: [{username: username}],
        });

        if (!user || !(await PasswordUtils.comparePassword(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    async updateUser(user: User): Promise<void> {

    }

    async getProfile(username: string): Promise<void> {

        const user = await this.usersRepository.findOneBy({username: username});

        if (!user) {
            throw new NotFoundException('User not found');
        }
    }

    async resetUsersPassword() {

        await this.dataSource.transaction(async (manager) => {

            const pageSize = 1000;
            let page = 0;

            while (true) {
                const users = await manager
                    .getRepository(User)
                    .createQueryBuilder('user')
                    .setLock('pessimistic_write')
                    .orderBy('user.id', 'ASC')
                    .skip(page * pageSize)
                    .take(pageSize)
                    .getMany();

                if (users.length === 0) {
                    break;
                }

                users.forEach((user) => {
                    user.password = null;
                });

                await manager.save(users);

                page++;
            }
        });
    }
}
