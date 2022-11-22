import {
  IsUUID,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsArray,
  Length,
  ValidateNested,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class ExternalUserDto {
  @IsUUID()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeHtml(value))
  id: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeHtml(value))
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeHtml(value))
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeHtml(value))
  email: string;

  @IsArray()
  @IsNotEmpty()
  dateOfBirth: Array<number>;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExternalUserAddressDto)
  @IsOptional()
  address?: Array<ExternalUserAddressDto>;
}

export class ExternalUserAddressDto {
  @IsString()
  @Length(4, 56)
  @Transform(({ value }) => sanitizeHtml(value))
  country: string;

  @IsString()
  @Length(1, 100)
  @Transform(({ value }) => sanitizeHtml(value))
  city: string;

  @IsString()
  @Length(1, 100)
  @Transform(({ value }) => sanitizeHtml(value))
  street: string;

  @IsNumber()
  @IsNotEmpty()
  houseNo: number;

  @IsNumber()
  @IsOptional()
  apartmentNo?: number;
}
