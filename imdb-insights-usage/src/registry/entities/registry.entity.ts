import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Registry {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  ip: string;

  @Column()
  endpoint: string;

  @Column()
  date: Date;
}
