import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDTO } from './dto/users.dto';
import { UsersService } from './users.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('get-all')
  @ApiResponse({
    status: 200,
    description: 'Returns all users',
    type: [UserDTO],
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Get('get-by-id/:id')
  @ApiParam({ name: 'id', description: 'User id', type: 'integer' })
  @ApiResponse({
    status: 200,
    description: 'Returns a user by id',
    type: UserDTO,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async getUserById(@Param('id') id: number): Promise<User> {
    return await this.usersService.getUserById(id);
  }

  @Get('get-by-login/:login')
  @ApiParam({ name: 'login', description: 'User login', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Returns a user by login',
    type: UserDTO,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async getUserByLogin(@Param('login') login: string): Promise<User> {
    return await this.usersService.getUserByLogin(login);
  }

  @Post('create')
  @ApiBody({ type: UserDTO })
  @ApiResponse({
    status: 201,
    description: 'Creates a new user',
    type: UserDTO,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async createUser(@Body() data: User): Promise<User> {
    return await this.usersService.createUser(data);
  }

  @Put('update/:id')
  @ApiParam({ name: 'id', description: 'User id', type: 'integer' })
  @ApiBody({ type: UserDTO })
  @ApiResponse({
    status: 200,
    description: 'Updates an existing user',
    type: UserDTO,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async updateUser(@Param('id') id: number, @Body() data: User): Promise<User> {
    return await this.usersService.updateUser(id, data);
  }

  @Delete('delete/:id')
  @ApiParam({ name: 'id', description: 'User id', type: 'integer' })
  @ApiResponse({ status: 204, description: 'Deletes a user' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.usersService.deleteUser(id);
  }
}
