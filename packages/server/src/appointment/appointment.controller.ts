import {
  Controller,
  Get,
  Post,
  Body,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentDto } from './appointment-dto';
import { minHour, maxHour } from '@schedule/core';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  async index() {
    return this.appointmentService.findAppointments();
  }

  @Post()
  async create(@Body() appointment: AppointmentDto) {
    const hourIsAvailable: boolean = this.appointmentService.checkHourAvailability(
      appointment.hour,
    );
    if (hourIsAvailable) {
      throw new BadRequestException('hour invalid');
    }
    const success = await this.appointmentService.createAppointment(
      appointment,
    );
    if (!success) {
      throw new ConflictException();
    }
    return;
  }
}
