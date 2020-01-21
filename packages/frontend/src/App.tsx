import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppointmentSchedule from './appointment/components/AppointmentSchedule';
import { appointmentSchedule } from './mock/appointment-schedule';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <AppointmentSchedule schedule={appointmentSchedule} />
      </header>
    </div>
  );
};

export default App;
