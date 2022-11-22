import {
  IsNumber,
  IsUUID,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Statuses } from '../enums/statuses.enum';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class UpdateOrderDto {
  @ValidateNested({ each: true })
  @Type(() => UpdateOrderProductDto)
  orderedProducts: Array<UpdateOrderProductDto>;

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

  @IsEnum(Statuses, { each: true })
  @IsArray()
  status: Statuses;
}

export class UpdateOrderProductDto {
  @IsNotEmpty()
  @IsUUID()
  @Transform(({ value }) => sanitizeHtml(value))
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
