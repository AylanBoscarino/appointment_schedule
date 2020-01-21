import React from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/styles';
import { Theme, Container, Card, Grid } from '@material-ui/core';
import {
  AppointmentScheduleContract,
  AppointmentContract,
} from '@schedule/core';
import AppointmentsList from './AppointmentsList';

interface Props extends WithStyles<typeof styles> {
  schedule: AppointmentScheduleContract;
}

function AppointmentSchedule(props: Props) {
  const { classes, schedule } = props;
  const entries: [string, AppointmentContract[]][] = Object.entries(schedule);

  return (
    <Container>
      <Grid container className={classes.container} spacing={3}>
        {entries.map((entry: [string, AppointmentContract[]], index) => {
          const [date, appointments] = entry;
          return (
            <Grid key={index} item>
              <AppointmentsList date={date} appointments={appointments} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
      padding: 25,
    },
    text: {
      font: 'roboto',
    },
  });

export default withStyles(styles)(AppointmentSchedule);
