import { Response } from '../../response/entities/response.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  result_id: number;

  @Column()
  response_id: number;

  @Column()
  score: number;

  @Column()
  n_corrects: number;

  @Column()
  n_incorrects: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne((type) => Response)
  @JoinColumn({ name: 'response_id' })
  response: Response;
}
