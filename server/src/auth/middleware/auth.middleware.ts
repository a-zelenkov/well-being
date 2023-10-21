import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from './jwt-payload.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    const accessToken = req?.get('cookie')?.split('JWT_Refresh_Token=')[1];

    const base64Payload = accessToken.split('.')[1];
    const payloadBuffer = Buffer.from(base64Payload, 'base64');
    const updatedJwtPayload: JwtPayload = JSON.parse(
      payloadBuffer.toString(),
    ) as JwtPayload;

    console.log(updatedJwtPayload);

    const user = await this.userService.getByEmail(updatedJwtPayload.email);
    console.log(user);
    if (!accessToken)
      throw new HttpException(
        'Рефреш токен отсутсвует',
        HttpStatus.UNAUTHORIZED,
      );
    req.user = user;
    next();
  }
}
