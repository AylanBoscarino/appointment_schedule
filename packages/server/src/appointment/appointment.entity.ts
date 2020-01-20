import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { AppointmentContract } from '@schedule/core';

@Entity()
export class AppointmentEntity implements AppointmentContract {
  @ObjectIdColumn()
  id!: ObjectID;
  @Column()
  name!: string;
  @Column()
  email!: string;
  @Column()
  phone!: number;
  @Column()
  date!: string;
  @Column()
  hour!: number;
}
