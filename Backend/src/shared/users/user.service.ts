import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import {users} from "../../models/entities/users.entity";


@Injectable()
export class UserService {
    constructor(
        private readonly connection: Connection,
    ) {}

    public async validateUser(userInput: any) {
        const user = await this.getUser(userInput.username);
        if (user) {
            const bcrypt = require('bcryptjs');
            const res = await bcrypt.compare(userInput.password, user.password);
            return res;
        } else {
            return false;
        }
    }

    public getUser(username) {
        return this.connection
            .getRepository(users)
            .createQueryBuilder('u')
            .where('u.username = :username', {username} )
            .getOne();
    }
}
