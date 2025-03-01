import { Book } from "../entity/book.entity";

export class BookResponseDto {
  id: string;
  title: string;
  authors: string[];
  description: string;
  year: number;
  quantity: number;
  publisher: string;
  category: string;
  location: string;

  constructor(book: Book) {
    this.id = book.id;
    this.title = book.title;
    this.authors = book.authors;
    this.description = book.description;
    this.year = book.year;
    this.quantity = book.quantity;
    this.publisher = book.publisher;
    this.category = book.category?.name || "Неизвестно";
    this.location = book.location?.shelf || "Неизвестно";
  }
}
