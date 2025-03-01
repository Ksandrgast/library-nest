import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class BookLocation {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    shelf: string; // Номер полки, секции и т.д.

    @OneToMany(() => Book, (book) => book.location)
    books: Book[];
}
