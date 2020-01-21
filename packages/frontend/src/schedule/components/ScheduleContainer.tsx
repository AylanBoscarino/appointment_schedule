import React, { createContext, useState, useEffect } from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/styles';
import { Theme, Container, Switch } from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {
  children?: React.ReactNode;
}

export enum ScheduleContextType {
  CLIENT,
  ADMIN,
}

type XContextType = 'CLIENT' | 'ADMIN';

export const ScheduleContext = createContext<ScheduleContextType>(
  ScheduleContextType.CLIENT,
);

function ScheduleContainer(props: Props) {
  const { classes } = props;
  const [scheduleContext, setScheduleContext] = useState<ScheduleContextType>(
    ScheduleContextType.CLIENT,
  );
  const [contextSwitch, setContextSwitch] = useState(false);
  const toggleSwitch = () => {
    const newContextSwitchState = !contextSwitch;
    setContextSwitch(newContextSwitchState);
    setScheduleContext(
      newContextSwitchState
        ? ScheduleContextType.ADMIN
        : ScheduleContextType.CLIENT,
    );
  };
  return (
    <Container className={classes.container}>
      Cliente{' '}
      <Switch color="primary" checked={contextSwitch} onChange={toggleSwitch} />{' '}
      Admin
      <ScheduleContext.Provider value={scheduleContext}>
        {props.children}
      </ScheduleContext.Provider>
    </Container>
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

export default withStyles(styles)(ScheduleContainer);
