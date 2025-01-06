import {HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from '../../shared/users/user.service';
import {users} from '../../models/entities/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) { }

    public async login(user: users) {
        // tslint:disable-next-line:no-console
        const userData = await this.userService.getUser(user.username);
        const payload = { username: userData.username, sub: userData.id };
        // tslint:disable-next-line:no-console
        const token = await this.jwtService.sign(payload, {secret: process.env.JWT_SECRET});
        // tslint:disable-next-line:no-console
        return {
            accessToken: token,
        };
    }
}
