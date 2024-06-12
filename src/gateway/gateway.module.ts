import { Module } from '@nestjs/common';
import { UsersModule } from '../user/users.module';
import { EventGateway } from './events.gateway';

@Module({
  providers: [EventGateway],
  exports: [EventGateway],
  imports: [UsersModule],
})
export class GatewayModule {}
