import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserRole } from "../enums/user-role.enum";
import { Booking } from "./booking.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index()
  @Column({ unique: true, length: 100 })
  login: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ unique: true, length: 15, nullable: true })
  phone: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.READER })
  role: UserRole;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(() => Booking, (booking) => booking.book)
  bookings: Booking[];
}
