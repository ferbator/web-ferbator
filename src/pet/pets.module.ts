import { Module } from '@nestjs/common';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { PrismaService } from '../prisma.service';
import { GatewayModule } from '../gateway/gateway.module';

@Module({
  imports: [GatewayModule],
  controllers: [PetsController],
  providers: [PetsService, PrismaService],
  exports: [PetsService],
})
export class PetsModule {}
