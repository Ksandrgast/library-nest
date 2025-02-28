import {Books} from "../entity/books.entity";

export interface BooksService {

    createBook(book: any): Promise<Books>;

    getBooks(): Promise<Books[]>;

    getBookById(bookId: string): Promise<void>;

    updateBook(bookId: string, book: any): Promise<void>;

    deleteBook(bookId: string): Promise<void>;
}
