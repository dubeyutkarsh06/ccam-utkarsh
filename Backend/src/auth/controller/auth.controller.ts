import {Body, Controller, HttpStatus, Post, Response, UseGuards} from '@nestjs/common';
import { users } from '../../models/entities/users.entity';
import {AuthService} from '../service/auth.service';
import {LocalAuthGuard} from '../guards/local-auth.guard';

@Controller('api/auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) {}

    /**
     * login route to log into the intern area;
     * gets a username and a password as parameter if valid returns a jwt token
     * @param res
     * @param userInput
     */
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    public async login(@Response() res: any, @Body() userInput: users) {
        if ((!(userInput && userInput.username && userInput.password))) {
            res.status(HttpStatus.FORBIDDEN).json({message: 'Username and Password are required!'});
        }
        return res.status(HttpStatus.OK).json(await this.authService.login(userInput));
    }
}
