import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
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

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ default: false })
  isDeleted: boolean;
}
