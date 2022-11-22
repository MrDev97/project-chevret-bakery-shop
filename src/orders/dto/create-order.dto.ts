import {
  IsNumber,
  IsUUID,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class CreateOrderDto {
  @ValidateNested({ each: true })
  @Type(() => CreateOrderProductDto)
  orderedProducts: Array<CreateOrderProductDto>;

  @IsNotEmpty()
  @IsUUID()
  @Transform(({ value }) => sanitizeHtml(value))
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  @Transform(({ value }) => sanitizeHtml(value))
  addressId: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => sanitizeHtml(value))
  description: string;
}

export class CreateOrderProductDto {
  @IsNotEmpty()
  @IsUUID()
  @Transform(({ value }) => sanitizeHtml(value))
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
