import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsUUID, ValidateNested } from 'class-validator';
import { CreateOrderToProductDto } from './create-order-to-product.dto';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Número da mesa que fez o pedido',
    example: 10,
  })
  tableNumber: number;

  @IsUUID()
  @ApiProperty({
    description: 'Id do usuário que fez o pedido',
    example: '63d3d4cf-be70-4b86-830e-e14305dd328c',
  })
  userId: string;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderToProductDto)
  @ApiProperty({
    description: `Lista de id's e quantidades dos produtos que estão sendo pedidos`,
    type: [CreateOrderToProductDto],
  })
  products: CreateOrderToProductDto[];
}
