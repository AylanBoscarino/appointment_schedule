export interface AppointmentContract {
  name: string;
  email: string;
  phone: number;
  date: string;
  hour: number;
}

export const dateRegEx: RegExp = /^(0[1-9]|1\d|2\d|3[01])\-(0[1-9]|1\d|2\d|3[01])\-(19|20)\d{2}$/;
