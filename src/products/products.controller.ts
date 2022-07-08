import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { FavoriteProductDto } from '../favorites/dto/favorite.dto';
import { Favorite } from 'src/favorites/entities/favorite.entity';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({
    summary: 'Criação de produtos',
  })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listagem de produtos',
  })
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Listagem de um produto',
  })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Get(':id/users-liked')
  @ApiOperation({
    summary: 'Lista de usuários que tem o produto do id enviado como favorito',
  })
  findUsersLiked(@Param('id') id: string) {
    return this.productsService.findUsersLiked(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualização de um produto',
  })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Exclusão de um produto',
  })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Post('favorite')
  @ApiOperation({
    summary: 'Favoritar produto',
  })
  favorite(@Body() dto: FavoriteProductDto): Promise<Favorite> {
    return this.productsService.favorite(dto);
  }

  @Delete('favorite/:id')
  @ApiOperation({
    summary: 'Desfavoritar produto',
  })
  unfav(@Param('id') id: string) {
    return this.productsService.unfav(id);
  }
}
