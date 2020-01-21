import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import PhoneInput from './PhoneInput';
import { useCreateAppointmentFormState } from '../functions/hooks';

export default function CreateAppointmentDialog() {
  const { state, handleChange } = useCreateAppointmentFormState();
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Agendar nova consulta
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Agendar nova consulta</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para agendar uma consulta selecione um horário disponível e insira
            seu nome, e-mail e telefone com DDD
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
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
