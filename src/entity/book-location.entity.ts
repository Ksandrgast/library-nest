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
export class BookLocation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  floor: string; // Номер этажа

  @Column()
  room: string; // Номер комнаты\склада и т.д.

  @Column()
  row: string; // Номер ряда

  @Column()
  shelf: string; // Номер полки, секции и т.д.

  @OneToMany(() => Book, (book) => book.location)
  books: Book[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ default: false })
  isDeleted: boolean;
}
