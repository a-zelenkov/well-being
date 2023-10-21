import { Injectable } from '@nestjs/common';
import { JwtPayload } from './middleware/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor() {}

  decodeToken(accessToken: string) {
    const base64Payload = accessToken.split('.')[1];
    const payloadBuffer = Buffer.from(base64Payload, 'base64');
    const updatedJwtPayload: JwtPayload = JSON.parse(
      payloadBuffer.toString(),
    ) as JwtPayload;
    return updatedJwtPayload;
  }
}
