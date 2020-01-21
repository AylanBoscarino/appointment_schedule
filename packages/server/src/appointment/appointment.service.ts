import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentEntity } from './appointment.entity';
import { Repository } from 'typeorm';
import {
  AppointmentContract,
  scheduleDays,
  minHour,
  maxHour,
} from '@schedule/core';
import moment from 'moment';
import { AppointmentScheduleDto } from './appointment-schedule-dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
  ) {}

  async createAppointment(appointment: AppointmentContract): Promise<boolean> {
    appointment.date = this.ratificateDate(appointment.date);
    const [_, count] = await this.appointmentRepository.findAndCount({
      where: {
        date: appointment.date,
        hour: appointment.hour,
      },
    });
    if (count === 0) {
      await this.appointmentRepository.insert(appointment);
      return true;
    }
    return false;
  }

  async findAppointments(): Promise<AppointmentScheduleDto> {
    const currentMoment = moment();
    const today = currentMoment.startOf('day').toISOString();
    const lastDay = currentMoment
      .add(scheduleDays, 'days')
      .endOf('day')
      .toISOString();

    const appointments = await this.appointmentRepository.find({
      where: {
        date: {
          $gt: today,
          $lt: lastDay,
        },
      },
    });

    const appointmentSchedule = new AppointmentScheduleDto(scheduleDays);

    for (const appointment of appointments) {
      const [date] = appointment.date.split('T');
      appointmentSchedule[date].push(appointment);
    }

    return appointmentSchedule;
  }

  checkHourAvailability(hour: number): boolean {
    return hour >= minHour && hour <= maxHour;
  }

  private ratificateDate(date: string): string {
    const yearMonthDay = date.split('T')[0];
    return moment(yearMonthDay)
      .startOf('day')
      .toISOString();
  }
}
