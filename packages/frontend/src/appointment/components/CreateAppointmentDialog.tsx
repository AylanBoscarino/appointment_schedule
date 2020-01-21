import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import PhoneInput from './PhoneInput';
import { useCreateAppointmentFormState } from '../functions/hooks';
import { Backdrop, CircularProgress } from '@material-ui/core';

interface Props {
  open: boolean;
  handleSubmit(): Promise<void>;
  handleCancel(): void;
}

export default function CreateAppointmentDialog(props: Props) {
  const { state, handleChange } = useCreateAppointmentFormState();
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    props.handleCancel();
    setLoading(true);
    try {
      await props.handleSubmit();
    } finally {
      setLoading(false);
    }
  }

  return loading ? (
    <Backdrop open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
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
