import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Pet } from '@prisma/client';

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

  async getAllPets(): Promise<Pet[]> {
    return this.prisma.pet.findMany();
  }

  async getPetById(id: number): Promise<Pet> {
    return this.prisma.pet.findUnique({ where: { id: Number(id) } });
  }

  async createPet(data: Pet): Promise<Pet> {
    const result = {
      name: data.name,
      description: data.description,
      birthday: null,
      breedId: +data.breedId,
      color: data.color,
      ownerId: +data.ownerId,
    };
    return this.prisma.pet.create({ data: result });
  }

  async updatePet(id: number, data: Pet): Promise<Pet> {
    const result = {
      name: data.name,
      description: data.description,
      birthday: null,
      breedId: +data.breedId,
      color: data.color,
      ownerId: +data.ownerId,
    };
    return this.prisma.pet.update({ where: { id: Number(id) }, data: result });
  }

  async deletePet(id: number): Promise<Pet> {
    return this.prisma.pet.delete({ where: { id: Number(id) } });
  }
}
