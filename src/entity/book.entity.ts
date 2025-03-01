import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { BookCategory } from "./book-category.entity";
import { BookLocation } from "./book-location.entity";

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

  @Column()
  publisher: string;

  @ManyToOne(() => BookCategory, (category) => category.books)
  category: BookCategory;

  @ManyToOne(() => BookLocation, (location) => location.books)
  location: BookLocation;
}
