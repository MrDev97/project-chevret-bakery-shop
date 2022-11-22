import {
  IsNumber,
  IsUUID,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsEnum,
  IsArray,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Statuses } from '../enums/statuses.enum';
import { UserAddress } from 'src/users/db/userAddress.entity';
import { User } from 'src/users/db/users.entity';
import { Product } from 'src/products/db/product.entity';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class ExternalOrderDto {
  @IsNotEmpty()
  @IsUUID()
  @Transform(({ value }) => sanitizeHtml(value))
  id: string;

  @ValidateNested({ each: true })
  @Type(() => ExternalOrderProductDto)
  orderedProducts: Array<ExternalOrderProductDto>;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => sanitizeHtml(value))
  user: User;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => sanitizeHtml(value))
  address: UserAddress;

  @IsNotEmpty()
  @IsDate()
  createdAt: Array<number>;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsEnum(Statuses, { each: true })
  @IsArray()
  status: Statuses;
}

export class ExternalOrderProductDto {
  @IsNotEmpty()
  @IsUUID()
  @Transform(({ value }) => sanitizeHtml(value))
  id: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  product: Product;
}
