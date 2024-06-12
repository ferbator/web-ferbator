import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({ example: 1, description: 'The ID of the user' })
  id: number;

  @ApiProperty({
    example: 'susbebov@example.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({ example: 'susbebov', description: 'The login of the user' })
  login: string;

  @ApiProperty({ example: '********', description: 'The password of the user' })
  password: string;

  @ApiProperty({ example: 'user', description: 'The role of the user' })
  role: string;

  @ApiProperty({
    example: 'Sus Bebov',
    description: 'The full name of the user',
  })
  fullName: string;
}
