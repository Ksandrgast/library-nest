import {Injectable} from "@nestjs/common";
import {BooksService} from "../books.service";
import {DataSource, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Books} from "../../entity/books.entity";
import {CreateBookRequestDto} from "../../dto/create-book-request.dto";

@Injectable()
export class DefaultBooksService implements BooksService {

    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(Books)
        private readonly booksRepository: Repository<Books>,
    ) {
    }

    async createBook(book: CreateBookRequestDto): Promise<Books> {

        const newBook = this.booksRepository.create(book);

        return this.booksRepository.save(newBook);
    }

    async getBooks(): Promise<Books[]> {

        return this.booksRepository.find();
    }

    async getBookById(bookId: string): Promise<void> {
        return undefined;
    }

    async updateBook(bookId: string, book: any): Promise<void> {
        return undefined;
    }

    async deleteBook(bookId: string): Promise<void> {
        return undefined;
    }
}
