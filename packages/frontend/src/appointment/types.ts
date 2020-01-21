export interface CreateAppointmentFormState {
  name: string;
  email: string;
  phone: string;
}

export type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;

export type StateHandlerEnumaration = {
  [key in keyof CreateAppointmentFormState]: ChangeHandler;
};
