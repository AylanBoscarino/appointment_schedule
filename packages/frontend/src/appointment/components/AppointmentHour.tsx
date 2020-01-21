import React from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { AppointmentContract } from '@schedule/core';

interface Props extends WithStyles<typeof styles> {
  hour: number;
  appointment?: AppointmentContract;
}

function AppointmentHour(props: Props) {
  const { classes, hour, appointment } = props;
  const hourStyle = !!appointment ? classes.busyHour : classes.availableHour;
  return (
    <div className={classes.hourContainer}>
      <div className={hourStyle}>
        <p>{hour}:00</p>
      </div>
    </div>
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
    hourContainer: {
      margin: 2,
    },
    availableHour: {
      backgroundColor: 'green',
    },
    busyHour: {
      backgroundColor: 'red',
    },
  });

export default withStyles(styles)(AppointmentHour);
