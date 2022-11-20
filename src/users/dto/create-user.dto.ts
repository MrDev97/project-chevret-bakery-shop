import { Transform, Type } from 'class-transformer';
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

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

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
