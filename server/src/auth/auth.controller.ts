import { Body, Controller, Post, Res } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor() {}

  @Post()
  async getProfile(@Res() res, @Body() token: string) {
    try {
      res.cookie('Token', token, {
        httpOnly: true,
        // secure: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });
    } catch (ex) {
      return { error: ex };
    }
  }
}
