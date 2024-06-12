import {
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UsersService } from '../user/users.service';

@WebSocketGateway({ namespace: 'pet' })
export class EventGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  usersSockets = new Map<string, Socket[]>();
  constructor(private userService: UsersService) {}

  afterInit() {
    console.log('Init');
  }

  handleDisconnect(socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`);
  }

  async handleConnection(socket: Socket) {
    const userId = 'a7500bfc-93bc-45af-a0a2-0ee00f16ceb5';
    const user = await this.userService.findUserExternalId(userId);
    if (!user) {
      return socket.disconnect();
    }
    const userSockets = this.usersSockets.get(userId) || [];
    this.usersSockets.set(userId, [...userSockets, socket]);
  }

  sendPetCreate(userId: string) {
    const sockets = this.usersSockets.get(userId) || [];
    sockets.forEach((socket) => {
      socket.emit('NewPet', 'new pet');
    });
  }

  sendPetUpdate(userId: string, str) {
    const sockets = this.usersSockets.get(userId) || [];
    sockets.forEach((socket) => {
      socket.emit('UpdatePet', 'update pet:', str);
    });
  }
}
