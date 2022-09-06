import { log } from 'console';
import { Report } from '../reports/report.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
  @AfterInsert()
  logInsert() {
    log(`Inserted User with ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    log(`Updated User with ${this.id}`);
  }
  @AfterRemove()
  logRemove() {
    log(`Removed User with ${this.id}`);
  }
}
