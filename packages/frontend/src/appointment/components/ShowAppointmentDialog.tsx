import React, { useContext } from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/styles';
import {
  Theme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import { AppointmentContract } from '@schedule/core';
import { AppointmentContext } from './Main';
import appointmentService from '../services/appointment.service';

interface Props extends WithStyles<typeof styles> {
  open: boolean;
  appointment: AppointmentContract;
  handleCancel(): void;
}

function ShowAppointmentDialog(props: Props) {
  const { appointment } = props;
  const setAppointmentFetches = useContext(AppointmentContext);

  const [year, month, day] = appointment.date.split('T')[0].split('-');
  const date = `${day}/${month}/${year}`;
  async function handleDelete() {
    try {
      await appointmentService.removeAppointment(appointment.id! as string);
      setAppointmentFetches(prev => prev + 1);
    } finally {
      props.handleCancel();
    }
  }
  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Consulta agendada</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <b>Nome:</b> {appointment.name}
        </DialogContentText>
        <DialogContentText>
          <b>E-mail:</b> {appointment.email}
        </DialogContentText>
        <DialogContentText>
          <b>Telefone:</b> {appointment.phone}
        </DialogContentText>
        <DialogContentText>
          <b>Dia da consulta:</b> {date}
        </DialogContentText>
        <DialogContentText>
          <b>Hora agendada:</b> {appointment.hour}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.handleCancel}>
          Ok
        </Button>
        <Button color="secondary" onClick={handleDelete}>
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    container: {
      flex: 1,
    },
    text: {
      font: 'roboto',
    },
  });

export default withStyles(styles)(ShowAppointmentDialog);
