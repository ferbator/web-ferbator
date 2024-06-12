import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AuthController {
  @Get('login')
  async login(@Res() res: Response): Promise<void> {
    res.send('');
  }
}
