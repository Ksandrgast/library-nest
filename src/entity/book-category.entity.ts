import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class BookCategory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  titleRu: string;

  @Column()
  titleKk: string;

  @Column()
  titleEn: string;

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];
}
