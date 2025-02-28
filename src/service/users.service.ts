import {User} from "../entity/user.entity";

export interface UsersService {

    signUp(user: User, password: string): Promise<void>;

    signIn(username: string, password: string): Promise<void>;

    updateUser(user: User): Promise<void>;

    getProfile(username: string): Promise<void>;
}
