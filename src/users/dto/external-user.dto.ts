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
import { Type } from 'class-transformer';

export class ExternalUserDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
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
  country: string;

  @IsString()
  @Length(1, 100)
  city: string;

  @IsString()
  @Length(1, 100)
  street: string;

  @IsNumber()
  @IsNotEmpty()
  houseNo: number;

  @IsNumber()
  @IsOptional()
  apartmentNo?: number;
}
