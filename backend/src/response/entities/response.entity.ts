import { Form } from 'src/form/entities/form.entity';
import { Users } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  response_id: number;

  @Column()
  form_id: number;

  @Column()
  user_id: number;

  @Column('jsonb')
  response_data: any;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  submitted_at: Date;

  @ManyToOne((type) => Form)
  @JoinColumn({ name: 'form_id' }) // Specify the custom foreign key column name
  form: Form;

  @ManyToOne((type) => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
