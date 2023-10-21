import { Body, Controller, Post, Res } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post()
  setToken(@Res() res, @Body() token: string) {
    try {
      res
        .cookie('Token', token, {
          httpOnly: true,
          // secure: true,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        })
        .send({
          auth: true,
        });
    } catch (ex) {
      return { error: ex };
    }
  }
}
