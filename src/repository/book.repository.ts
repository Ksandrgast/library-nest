import { EntityRepository, Repository } from "typeorm";
import { Book } from "../entity/book.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async findByTitle(title: string): Promise<Book[]> {
    return this.createQueryBuilder("book")
      .where("LOWER(book.title) LIKE LOWER(:title)", { title: `%${title}%` })
      .getMany();
  }

  async findByCategory(categoryId: string): Promise<Book[]> {
    return this.createQueryBuilder("book")
      .where("book.categoryId = :categoryId", { categoryId })
      .getMany();
  }
}
