import { Book } from "../entity/book.entity";

export class BookResponseDto {
  id: string;
  title: string;
  authors: string[];
  description: string;
  year: number;
  quantity: number;
  categoryId: string;
  locationId: string;

  constructor(book: Book) {
    this.id = book.id;
    this.title = book.title;
    this.authors = book.authors;
    this.description = book.description;
    this.year = book.year;
    this.quantity = book.quantity;
    this.categoryId = book.categoryId;
    this.locationId = book.locationId;
  }
}
