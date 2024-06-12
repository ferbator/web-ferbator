import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: Number(id) } });
  }

  async getUserByLogin(login: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { login: login } });
  }

  async createUser(data: User): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async updateUser(id: number, data: User): Promise<User> {
    return this.prisma.user.update({ where: { id: Number(id) }, data });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id: Number(id) } });
  }

  async findUserExternalId(id: string) {
    return this.prisma.user.findUnique({
      where: {
        externalId: id,
      },
    });
  }
}
