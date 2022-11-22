import { Tags } from '../enums/tags.enum';
import {
  MinLength,
  MaxLength,
  Min,
  IsInt,
  IsEnum,
  IsArray,
  IsUUID,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class ExternalProductDto {
  @IsUUID()
  id: string;

  @MinLength(1)
  @MaxLength(25)
  @Transform(({ value }) => sanitizeHtml(value))
  name: string;

  @Min(0)
  @IsInt()
  price: number;

  @Min(0)
  @IsInt()
  quantity: number;

  @IsString()
  @Transform(({ value }) => sanitizeHtml(value))
  description: string;

  @IsOptional()
  @IsEnum(Tags, { each: true })
  @IsArray()
  tags?: string[];

  @IsArray()
  @IsNumber({}, { each: true })
  createdAt: Array<number>;

  @IsArray()
  @IsNumber({}, { each: true })
  updatedAt: Array<number>;
}
