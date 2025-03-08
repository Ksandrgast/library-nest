import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
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
  @JoinColumn({ name: "categoryId" }) // Явное указание внешнего ключа
  category: BookCategory;

  @Column({ nullable: true }) // Добавляем categoryId в явном виде
  categoryId: string;

  @ManyToOne(() => BookLocation, (location) => location.books)
  @JoinColumn({ name: "locationId" }) // Явное указание внешнего ключа
  location: BookLocation;

  @Column({ nullable: true }) // Добавляем locationId в явном виде
  locationId: string;

  @OneToMany(() => Booking, (booking) => booking.book)
  bookings: Booking[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ default: false })
  isDeleted: boolean;
}
