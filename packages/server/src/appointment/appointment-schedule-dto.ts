import {
  AppointmentContract,
  AppointmentScheduleContract,
} from '@schedule/core';
import moment from 'moment';
export class AppointmentScheduleDto implements AppointmentScheduleContract {
  [key: string]: AppointmentContract[];

  constructor(range: number) {
    for (let i: number = 0; i < range; i++) {
      const value: string = moment()
        .add(i, 'days')
        .format('YYYY-MM-DD');
      this[value] = [];
    }
  }
}
