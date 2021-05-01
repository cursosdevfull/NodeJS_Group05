import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Car } from './Car';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  /*   @OneToOne((type) => Car)
  car: Car; */

  /*   @OneToMany((type) => Car, (car) => car.user, { cascade: true })
  cars: Car[]; */

  @ManyToMany((type) => Car, (car) => car.users, { cascade: true })
  cars: Car[];
}
