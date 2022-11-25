import { arrayToDate } from '../../shared/date.helper';
import {
  IsEmail,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  Length,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class CreateUserDto {
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

  @IsNotEmpty()
  password: string;

  @Transform((d) => arrayToDate(d))
  dateOfBirth: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserAddressDto)
  @IsOptional()
  address?: Array<CreateUserAddressDto>;
}

export class CreateUserAddressDto {
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
