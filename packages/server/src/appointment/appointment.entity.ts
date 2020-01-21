import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
} from 'typeorm';
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
  @CreateDateColumn()
  date!: string;
  @Column()
  hour!: number;
}
