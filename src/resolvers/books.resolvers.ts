import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {Books} from "../entity/books.entity";
import {CreateBookRequestDto} from "../dto/create-book-request.dto";
import {DefaultBooksService} from "../service/impl/default-books.service";

@Resolver(() => Books)
export class BooksResolver {
    constructor(private readonly booksService: DefaultBooksService) {
    }

    @Query(() => [Books]) // Определяем запрос для получения всех книг
    async findBooks(): Promise<Books[]> {
        return this.booksService.getBooks(); // Метод для получения всех книг из базы
    }

    @Mutation(() => Books)
    createBook(@Args('request') request: CreateBookRequestDto) {
        return this.booksService.createBook(request);
    }
}
