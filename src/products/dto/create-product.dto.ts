import { Tags } from '../enums/tags.enum';
import {
  MinLength,
  MaxLength,
  Min,
  IsEnum,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @MinLength(1)
  @MaxLength(25)
  name: string;

  @Min(0)
  @IsNumber()
  price: number;

  @Min(0)
  @IsNumber()
  count: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @IsEnum(Tags, { each: true })
  tags?: string[];
}
