import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useContext, useState, useEffect, createContext } from 'react';

import {
  ScheduleContext,
  ScheduleContextType,
} from '../../schedule/components/ScheduleContainer';
import {
  ChangeHandler,
  CreateAppointmentFormState,
  StateHandlerEnumaration,
} from '../types';
import { AppointmentScheduleContract } from '@schedule/core';
import appointmentService from '../services/appointment.service';

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

export function useAppointmentStyles(hasAppointment: boolean) {
  const context = useContext(ScheduleContext);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      availableHour: {
        backgroundColor: '#81c784',
      },
      busyHour: {
        backgroundColor: 'red',
      },
    }),
  );
  const classes = useStyles();

  if (
    (context === ScheduleContextType.ADMIN && hasAppointment) ||
    (context === ScheduleContextType.CLIENT && !hasAppointment)
  ) {
    return classes.availableHour;
  }
  return classes.busyHour;
}

export function useAppointmentFeedback(hasAppointment: boolean) {
  const context = useContext(ScheduleContext);
  const [showIsOpen, setShowIsOpen] = useState(false);
  const [createIsOpen, setCreateIsOpen] = useState(false);

  let handleClick = () => {};
  if (context === ScheduleContextType.ADMIN && hasAppointment) {
    handleClick = () => setShowIsOpen(true);
  }

  if (context === ScheduleContextType.ADMIN && !hasAppointment) {
    handleClick = () => alert('Nenhuma consulta agendada para este horário');
  }

  if (context === ScheduleContextType.CLIENT && !hasAppointment) {
    handleClick = () => setCreateIsOpen(true);
  }

  if (context === ScheduleContextType.CLIENT && hasAppointment) {
    handleClick = () => alert('Horário não disponível para agendamento');
  }

  return {
    handleClick,
    showIsOpen,
    setShowIsOpen,
    createIsOpen,
    setCreateIsOpen,
  };
}

export function useAppointmentSchedule(fetches: number) {
  const [appointmentsSchedule, setAppointmentsSchedule] = useState<
    AppointmentScheduleContract
  >();

  useEffect(() => {
    appointmentService.fetchAppointmentSchedule().then(setAppointmentsSchedule);
  }, [fetches]);

  return { appointmentsSchedule };
}
