import { Button, Link, Theme } from '@material-ui/core';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';
import { AppointmentContract } from '@schedule/core';
import React from 'react';

import {
  useAppointmentFeedback,
  useAppointmentStyles,
} from '../functions/hooks';
import CreateAppointmentDialog from './CreateAppointmentDialog';
import ShowAppointmentDialog from './ShowAppointmentDialog';

interface Props extends WithStyles<typeof styles> {
  hour: number;
  appointment?: AppointmentContract;
}

function WithAppointment(props: Props) {
  const { appointment, classes, hour } = props;
  const hourStyle = useAppointmentStyles(!!appointment);
  const appointmentFeedback = useAppointmentFeedback(!!appointment);

  return (
    <div className={classes.hourContainer}>
      {!!appointment && (
        <ShowAppointmentDialog
          open={appointmentFeedback.showIsOpen}
          appointment={appointment}
          handleCancel={() => appointmentFeedback.setShowIsOpen(false)}
          handleDelete={async () => {}}
        />
      )}
      <CreateAppointmentDialog
        handleCancel={() => appointmentFeedback.setCreateIsOpen(false)}
        handleSubmit={async () => {}}
        open={appointmentFeedback.createIsOpen}
      />
      <div className={hourStyle}>
        <p>
          <Button
            component={Link}
            onClick={appointmentFeedback.handleClick}
            style={{ width: '100%' }}
          >
            {hour}:00
          </Button>
        </p>
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
      margin: 4,
    },
  });

export default withStyles(styles)(WithAppointment);
