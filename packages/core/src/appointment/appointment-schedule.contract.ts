import { AppointmentContract } from './appointment.contract';

export interface AppointmentScheduleContract {
  [key: string]: AppointmentContract[];
}
