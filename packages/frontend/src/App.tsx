import './App.css';

import { AppointmentScheduleContract } from '@schedule/core';
import React, { useEffect, useState } from 'react';

import AppointmentSchedule from './appointment/components/AppointmentSchedule';
import appointmentService from './appointment/services/appointment.service';
import ScheduleContainer from './schedule/components/ScheduleContainer';

const App: React.FC = () => {
  const [appointmentsSchedule, setAppointmentsSchedule] = useState<
    AppointmentScheduleContract
  >();
  useEffect(() => {
    appointmentService.fetchAppointmentSchedule().then(setAppointmentsSchedule);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <ScheduleContainer>
          {!!appointmentsSchedule && (
            <AppointmentSchedule
              //@ts-
              schedule={appointmentsSchedule}
            />
          )}
        </ScheduleContainer>
        {/* <CreateAppointmentDialog /> */}
      </header>
    </div>
  );
};

export default App;
