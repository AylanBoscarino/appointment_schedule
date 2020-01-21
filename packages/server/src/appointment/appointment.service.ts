import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentEntity } from './appointment.entity';
import { Repository } from 'typeorm';
import { AppointmentContract } from '@schedule/core';
import moment from 'moment';
import { AppointmentScheduleDto } from './appointment-schedule-dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
  ) {}

  async createAppointment(appointment: AppointmentContract) {
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

  async findAppointments() {
    const currentMoment = moment();
    const today = currentMoment.hour(0).toISOString();
    const lastDay = currentMoment
      .add(15, 'days')
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

    const appointmentSchedule = new AppointmentScheduleDto();

    for (const appointment of appointments) {
      const [date] = appointment.date.split('T');
      appointmentSchedule.addAppointment(date, appointment);
    }

    return appointmentSchedule;
  }

  private ratificateDate(date: string): string {
    const yearMonthDay = date.split('T')[0];
    return moment(yearMonthDay)
      .startOf('day')
      .toISOString();
  }
}
