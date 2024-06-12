import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimingInterceptor } from './timing.interceptor';
import { PetsModule } from './pet/pets.module';
import { PetsService } from './pet/pets.service';
import { UsersService } from './user/users.service';
import { UsersModule } from './user/users.module';
import { PetsController } from './pet/pets.controller';
import { UsersController } from './user/users.controller';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { SupertokensService } from './auth/supertokens/supertokens.service';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    PetsModule,
    UsersModule,
    AuthModule.forRoot({
      connectionURI:
        'https://dev-4ca3d2b0ec1011edb9b8b90a35a84dea-us-east-1.aws.supertokens.io:3568',
      apiKey: 'WsicxWDROWKssjVuLujx4ZpQxEg0ld',
      appInfo: {
        appName: 'web-ferbator',
        apiDomain: 'http://localhost:12345',
        websiteDomain: 'http://localhost:12345',
        apiBasePath: '/api/auth',
        websiteBasePath: '/auth',
      },
    }),
    AuthModule,
    GatewayModule,
  ],
  controllers: [AppController, PetsController, UsersController, AuthController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimingInterceptor,
    },
    PetsService,
    UsersService,
    PrismaService,
  ],
})
export class AppModule {}
