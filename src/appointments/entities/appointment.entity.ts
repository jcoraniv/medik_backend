import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'timestamp'})
  scheduledDate: Date;

  @Column({type: 'int'})
  duration: number;

  @Column({type: 'text', nullable: true})
  notes: string;

  @Column({type: 'text', nullable: true})
  reason: string;

  @ManyToOne(() => User, (doctor) => doctor.appointments)
  doctor: User;

  @Column()
  doctorId: string
}