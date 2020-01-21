import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { AppointmentContract } from '@schedule/core';
import React, { useContext } from 'react';

import { useCreateAppointmentFormState } from '../functions/hooks';
import appointmentService from '../services/appointment.service';
import PhoneInput from './PhoneInput';
import { AppointmentContext } from './Main';

interface Props {
  open: boolean;
  handleCancel(): void;
  date: string;
  hour: number;
}

export default function CreateAppointmentDialog(props: Props) {
  const { state, handleChange } = useCreateAppointmentFormState();
  const setAppointmentFetches = useContext(AppointmentContext);

  async function handleSubmit() {
    try {
      const dateTime = new Date(props.date).toISOString();
      const appointment: AppointmentContract = {
        name: state.name,
        email: state.email,
        phone: state.phone,
        date: dateTime,
        hour: props.hour,
      };
      console.log({ appointment });
      await appointmentService.createAppointment(appointment);
      setAppointmentFetches(prev => prev + 1);
    } finally {
      props.handleCancel();
    }
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleCancel}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Agendar nova consulta</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Para agendar uma consulta selecione um horário disponível e insira seu
          nome, e-mail e telefone com DDD
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nome completo"
          type="text"
          fullWidth
          value={state.name}
          onChange={handleChange('name')}
        />
      </DialogContent>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Endereço de e-mail"
          type="email"
          fullWidth
          value={state.email}
          onChange={handleChange('email')}
        />
      </DialogContent>
      <DialogContent>
        <PhoneInput value={state.phone} onChange={handleChange('phone')} />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleCancel} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Cadastrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
