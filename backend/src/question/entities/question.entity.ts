import { Form } from 'src/form/entities/form.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  question_id: number;

  @Column()
  form_id: number;

  @Column()
  question_text: string;

  @Column()
  question_type: string;

  @Column()
  puntuation: number;

  @Column('jsonb')
  options: any;

  @Column('jsonb')
  constraints: any;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne((type) => Form)
  @JoinColumn({ name: 'form_id' }) // Specify the custom foreign key column name
  form: Form;
}
