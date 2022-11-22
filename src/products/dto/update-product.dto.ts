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
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class UpdateProductDto {
  @MinLength(1)
  @MaxLength(25)
  @Transform(({ value }) => sanitizeHtml(value))
  name: string;

  @Min(0)
  @IsNumber()
  price: number;

  @Min(0)
  @IsNumber()
  quantity: number;

  @IsString()
  @Transform(({ value }) => sanitizeHtml(value))
  description: string;

  @IsOptional()
  @IsArray()
  @IsEnum(Tags, { each: true })
  tags?: string[];
}
