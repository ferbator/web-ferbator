import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Render,
  UseGuards,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetDTO } from './dto/pets.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Pet } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { Session } from '../auth/session.decorator';
import { EventGateway } from '../gateway/events.gateway';

@ApiTags('Pet')
@Controller('pet')
export class PetsController {
  constructor(
    private readonly petsService: PetsService,
    private readonly eventGateway: EventGateway,
  ) {}

  @Get('all-pets')
  @Render('petsList')
  @ApiResponse({
    status: 200,
    description: 'Returns a list of pets',
    type: [PetDTO],
  })
  async getAllPets() {
    const pets = await this.petsService.getAllPets();
    return { pets };
  }

  @Get('get-by-id/:id')
  @ApiParam({ name: 'id', description: 'Pet id', type: 'integer' })
  @ApiResponse({
    status: 200,
    description: 'Returns a pet by id',
    type: PetDTO,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async getPetById(@Param('id') id: number): Promise<Pet> {
    return await this.petsService.getPetById(id);
  }

  @ApiCookieAuth()
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  @Post('create/')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ type: PetDTO })
  async createPet(
    @Body() data: Pet,
    @Session() session: SessionContainer,
  ): Promise<Pet> {
    const id = session.getUserId();
    this.eventGateway.sendPetCreate(id);
    return await this.petsService.createPet(data);
  }

  @ApiCookieAuth()
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  @Put('update/:id')
  @ApiParam({ name: 'id', description: 'Pet id', type: 'integer' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ type: PetDTO })
  async updatePet(@Param('id') id: number, @Body() data: Pet): Promise<Pet> {
    return await this.petsService.updatePet(id, data);
  }

  @ApiCookieAuth()
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  @Delete('delete/:id')
  @ApiParam({ name: 'id', description: 'Pet id', type: 'integer' })
  async deletePet(@Param('id') id: number): Promise<void> {
    await this.petsService.deletePet(id);
  }
}
