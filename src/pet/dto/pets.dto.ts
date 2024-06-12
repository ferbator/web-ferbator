import { ApiProperty } from '@nestjs/swagger';

export class PetDTO {
  @ApiProperty({ example: 1, description: 'The ID of the pet' })
  id: number;

  @ApiProperty({ example: 'Rex', description: 'The name of the pet' })
  name: string;

  @ApiProperty({ example: 'BROWN', description: 'The color of the pet' })
  color: string;

  @ApiProperty({
    example: '2023-04-21 18:23:02.000',
    description: 'The birthday of the pet',
  })
  birthday: Date;

  @ApiProperty({
    example: 'A lovely pet',
    description: 'The description of the pet',
  })
  description: string;

  @ApiProperty({ example: 1, description: 'The ID of the owner of the pet' })
  ownerId: number;

  @ApiProperty({ example: 1, description: 'The ID of the breed of the pet' })
  breedId: number;
}
