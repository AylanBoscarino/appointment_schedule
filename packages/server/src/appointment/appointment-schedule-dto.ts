import { AppointmentContract } from '@schedule/core';

export class AppointmentScheduleDto {
  [key: string]: AppointmentContract[] | any;
  addAppointment(schedule: string, appointment: AppointmentContract) {
    if (Array.isArray(this[schedule])) {
      this[schedule].push(appointment);
    } else {
      this[schedule] = [appointment];
    }
  }
}
