import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksService } from "../service/books.service";
import { BooksController } from "../api/books.controller";
import { Book } from "../entity/book.entity";
import { BookCategory } from "../entity/book-category.entity";
import { BookLocation } from "../entity/book-location.entity";
import { BookRepository } from "../repository/book.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookCategory, BookLocation])],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
  exports: [BooksService],
})
export class BooksModule {}
