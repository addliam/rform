import { Users } from '../../users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Form {
  @PrimaryGeneratedColumn()
  form_id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  user_id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // can use ManyToOne without OneToMany but not viceversa
  @ManyToOne((type) => Users)
  @JoinColumn({ name: 'user_id' }) // Specify the custom foreign key column name
  user: Users;
}
