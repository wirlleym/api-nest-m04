import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Wirlley',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'wirlley@pizzaflesh.com',
  })
  email: string;
}
