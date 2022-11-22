import { UserRoles } from '../../shared/enums/user-roles.enum';
import { arrayToDate } from '../../shared/date.helper';
import {
  IsEmail,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  IsEnum,
  IsOptional,
  IsString,
  IsArray,
  Length,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class UpdateUserDto {
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

  @Transform((d) => arrayToDate(d))
  dateOfBirth: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateUserAddressDto)
  @IsOptional()
  address?: Array<UpdateUserAddressDto>;

  @IsEnum(UserRoles)
  role: UserRoles;
}

export class UpdateUserAddressDto {
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
