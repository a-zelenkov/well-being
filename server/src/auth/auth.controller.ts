import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async setToken(@Res() res, @Body() data: any) {
    try {
      const payload = this.authService.decodeToken(data.token);

      const user = await this.userService.getByEmail(payload.email);
      if (!user) {
        res.purge(res).send({
          auth: false,
        });
      } else {
        this.setCookie(res, data.token).send({
          auth: true,
          user: user,
        });
      }
    } catch (ex) {
      return { error: ex };
    }
  }
  setCookie(res: Response, token: string) {
    return res.cookie('Token', token, {
      httpOnly: true,
      // secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
  }

  purge(res: Response) {
    res.cookie('Token', '', {
      httpOnly: true,
      expires: new Date(0),
    });
  }
}
