import {
  Body,
  Controller,
  Get,
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

      console.log(payload);
      const user = await this.userService.getByEmail(payload.email);
      if (!user) {
        this.purge(res).send({
          msg: false,
        });
      } else {
        this.setCookie(res, data.token).send(user);
      }
    } catch (ex) {
      return { error: ex };
    }
  }

  @Get('/logout')
  logout(@Res() res) {
    this.purge(res).send({
      msg: true,
    });
  }

  setCookie(res: Response, token: string) {
    return res.cookie('Token', token, {
      httpOnly: true,
      // secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
  }

  purge(res: Response) {
    return res.cookie('Token', '', {
      httpOnly: true,
      // secure: true,
      expires: new Date(0),
    });
  }
}
