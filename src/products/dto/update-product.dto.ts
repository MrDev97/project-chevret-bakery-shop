import { Tags } from '../enums/tags.enum';
import {
  MinLength,
  MaxLength,
  Min,
  IsNumber,
  IsEnum,
  IsArray,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  @MinLength(1)
  @MaxLength(25)
  name: string;

  @Min(0)
  @IsNumber()
  price: number;

  @Min(0)
  @IsNumber()
  quantity: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @IsEnum(Tags, { each: true })
  tags?: string[];
}
