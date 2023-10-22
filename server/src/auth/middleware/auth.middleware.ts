import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/user/user.service';
import { UpdateUserDto } from 'src/dto/user.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req?.get('cookie')?.split('Token=')[1];

    if (!accessToken)
      throw new HttpException(
        'Рефреш токен отсутствует',
        HttpStatus.UNAUTHORIZED,
      );

    const updatedJwtPayload = this.authService.decodeToken(accessToken);
    const user = await this.userService.getByEmail(updatedJwtPayload.email);
    if (!user) {
      throw new HttpException(
        'Такого пользователя не существует',
        HttpStatus.UNAUTHORIZED,
      );
    }
    req.user = { ...user, ...updatedJwtPayload };
    await this.userService.update(UpdateUserDto.from(req.user));
    next();
  }
}
