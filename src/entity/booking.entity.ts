import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Book } from "./book.entity";
import { User } from "./user.entity";
import { BookingStatus } from "../enums/booking-status.enum";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Book, (book) => book.bookings, { eager: true })
  book: Book;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @Column({ type: "date" })
  startDate: Date;

  @Column({ type: "date" })
  endDate: Date;

  @Column({ type: "enum", enum: BookingStatus })
  status: BookingStatus;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ default: false })
  isDeleted: boolean;
}
