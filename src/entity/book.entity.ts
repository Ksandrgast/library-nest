import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BookCategory } from "./book-category.entity";
import { BookLocation } from "./book-location.entity";
import { Booking } from "./booking.entity";

@Entity()
export class Book {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index()
  @Column()
  title: string;

  @Column("text", { array: true })
  authors: string[];

  @Column("text")
  description: string;

  @Column()
  year: number;

  @Column()
  quantity: number;

  @ManyToOne(() => BookCategory, (category) => category.books)
  category: BookCategory;

  @ManyToOne(() => BookLocation, (location) => location.books)
  location: BookLocation;

  @OneToMany(() => Booking, (booking) => booking.book)
  bookings: Booking[];
}
