import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from './appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity])],
  providers: [AppointmentService],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
