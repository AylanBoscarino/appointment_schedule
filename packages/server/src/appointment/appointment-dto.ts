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

  @IsNotEmpty()
  readonly phone!: string;

  @IsDateString()
  date!: string;

  @IsInt()
  readonly hour!: number;
}
