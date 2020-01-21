import { AppointmentContract } from '@schedule/core';
import {
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';

export class AppointmentDto implements AppointmentContract {
  @IsNotEmpty()
  readonly name!: string;

  @IsEmail()
  readonly email!: string;

  @IsPhoneNumber('BR')
  readonly phone!: number;

  @IsDateString()
  date!: string;

  @IsInt()
  readonly hour!: number;
}
