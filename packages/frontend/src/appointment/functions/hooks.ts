import React, { useState } from 'react';

import {
  ChangeHandler,
  CreateAppointmentFormState,
  StateHandlerEnumaration,
} from '../types';

export function useCreateAppointmentFormState() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handler: StateHandlerEnumaration = {
    name: e => setName(e.target.value),
    email: e => setEmail(e.target.value),
    phone: e => setPhone(e.target.value),
  };

  function handleChange(
    value: keyof CreateAppointmentFormState,
  ): ChangeHandler {
    return handler[value];
  }
  const state = { name, email, phone };

  return { handleChange, state };
}
