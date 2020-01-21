import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppointmentSchedule from './appointment/components/AppointmentSchedule';
import { appointmentSchedule } from './mock/appointment-schedule';
import CreateAppointmentDialog from './appointment/components/CreateAppointmentDialog';
import ScheduleContainer from './schedule/components/ScheduleContainer';
import ShowAppointmentDialog from './appointment/components/ShowAppointmentDialog';
import { appointmentContract } from './mock/appointment';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <ScheduleContainer>
          {/* <ShowAppointmentDialog
            handleCancel={() => {}}
            handleDelete={async () => {}}
            appointment={appointmentContract}
          /> */}
          <AppointmentSchedule schedule={appointmentSchedule} />
        </ScheduleContainer>
        {/* <CreateAppointmentDialog /> */}
      </header>
    </div>
  );
};

export default App;
