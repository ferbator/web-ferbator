import { Controller, Get, Header, Render, UseGuards } from '@nestjs/common';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session.decorator';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  @Header('X-Response-Time', 'true')
  index() {
    return {};
  }

  @Get('/mems')
  @Render('mems')
  mems() {
    return {};
  }

  @Get('/toDoList')
  @Render('toDoList')
  toDoList() {
    return {};
  }

  @Get('/petsList')
  @Render('petsList')
  petsList() {
    return {};
  }
  @Get('/profile')
  @Render('profile')
  profile() {
    return {};
  }

  @Get('test')
  @UseGuards(new AuthGuard())
  async getTest(@Session() session: SessionContainer): Promise<string> {
    return 'magic';
  }
}
