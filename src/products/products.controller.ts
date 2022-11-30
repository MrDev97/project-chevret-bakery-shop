import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  HttpCode,
  Put,
  ParseUUIDPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Product } from './db/product.entity';
import { ProductsDataService } from './products-data.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ExternalProductDto } from './dto/external-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { dateToArray } from 'src/shared/date.helper';
import { LoggedInGuard } from 'src/auth/guards/logged-in.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { ProductsQuery } from './queries/products-query.interface';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsDataService) {}

  @Get(':id')
  async getProductById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalProductDto> {
    return this.mapProductToExternal(
      await this.productService.getProductById(id),
    );
  }

  @Get()
  async getAllProducts(
    @Query() query: ProductsQuery,
  ): Promise<Array<ExternalProductDto>> {
    return (await this.productService.getAllProducts(query)).map((i) =>
      this.mapProductToExternal(i),
    );
  }

  @UseGuards(LoggedInGuard, AdminGuard)
  @Post()
  async addProduct(
    @Body() item: CreateProductDto,
  ): Promise<ExternalProductDto> {
    return this.mapProductToExternal(
      await this.productService.addProduct(item),
    );
  }

  mapProductToExternal(product: Product): ExternalProductDto {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
      tags: product.tags?.map((i) => i.name),
    };
  }

  @UseGuards(LoggedInGuard, AdminGuard)
  @Delete(':id')
  @HttpCode(204)
  deleteProduct(@Param('id') _id_: string): void {
    this.productService.deleteProduct(_id_);
  }

  @UseGuards(LoggedInGuard, AdminGuard)
  @Put(':id')
  async updateProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() product: UpdateProductDto,
  ): Promise<ExternalProductDto> {
    return this.mapProductToExternal(
      await this.productService.updateProduct(id, product),
    );
  }
}
