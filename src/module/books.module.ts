import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Books} from "../entity/books.entity";
import {DefaultBooksService} from "../service/impl/default-books.service";
import {BooksResolver} from "../resolvers/books.resolvers";

@Module({
    imports: [
        TypeOrmModule.forFeature([Books]),
    ],
    providers: [
        {
            provide: 'BooksService',
            useClass: DefaultBooksService,
        },
        DefaultBooksService,
        BooksResolver
    ],
})

export class BooksModule {
}
