import React from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/styles';
import { Theme, Paper } from '@material-ui/core';
import { AppointmentContract, listAvailableHours } from '@schedule/core';
import AppointmentHour from './AppointmentHour';

interface Props extends WithStyles<typeof styles> {
  date: string;
  appointments: AppointmentContract[];
}
const hours = listAvailableHours();

function AppointmentsList(props: Props) {
  const { classes, date, appointments } = props;
  const [year, month, day] = date.split('-');
  return (
    <Paper className={classes.container}>
      {day}/{month}/{year}
      <br />
      {hours.map(hour => {
        const appointment = appointments.find(ap => ap.hour === hour);
        return (
          <AppointmentHour
            key={hour}
            hour={hour}
            date={date}
            appointment={appointment}
          />
        );
      })}
    </Paper>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    container: {
      width: 260,
      paddingBottom: 1,
    },
    text: {
      font: 'roboto',
    },
  });

export default withStyles(styles)(AppointmentsList);
