import { Theme } from '@material-ui/core';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';
import React, { createContext, useState } from 'react';

import ScheduleContainer from '../../schedule/components/ScheduleContainer';
import { useAppointmentSchedule } from '../functions/hooks';
import AppointmentSchedule from './AppointmentSchedule';

interface Props extends WithStyles<typeof styles> {}

export const AppointmentContext = createContext<
  React.Dispatch<React.SetStateAction<number>>
>((n: any) => {});

function Main(props: Props) {
  const [appointmentFetches, setAppointmentFetches] = useState(0);
  const { appointmentsSchedule } = useAppointmentSchedule(appointmentFetches);

  return (
    <AppointmentContext.Provider value={setAppointmentFetches}>
      <ScheduleContainer>
        {!!appointmentsSchedule && (
          <AppointmentSchedule schedule={appointmentsSchedule} />
        )}
      </ScheduleContainer>
    </AppointmentContext.Provider>
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

export default withStyles(styles)(Main);
