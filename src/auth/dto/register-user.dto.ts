import { arrayToDate } from '../../shared/date.helper';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class RegisterUserDto {
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
}
