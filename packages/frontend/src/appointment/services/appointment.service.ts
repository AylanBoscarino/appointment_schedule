import {
  AppointmentScheduleContract,
  AppointmentContract,
} from '@schedule/core';

export class AppointmentService {
  private api = process.env.REACT_API_URL ?? 'http://192.168.15.12:3001';
  private appointmentRoute = '/appointment';

  async fetchAppointmentSchedule(): Promise<AppointmentScheduleContract> {
    const response = await fetch(this.api + this.appointmentRoute);
    const body: AppointmentScheduleContract = await response.json();
    return body;
  }

  async createAppointment(appointment: AppointmentContract): Promise<void> {
    const response = await fetch(this.api + this.appointmentRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointment),
    });
    if (response.status !== 201 && response.status !== 200) {
      throw new Error(String(response.status));
    }
  }

  async removeAppointment(id: string): Promise<void> {
    const response = await fetch(this.api + this.appointmentRoute + '/' + id, {
      method: 'DELETE',
    });
    if (response.status !== 200) {
      throw new Error(String(response.status));
    }
  }
}

const appointmentService = new AppointmentService();
export default appointmentService;
