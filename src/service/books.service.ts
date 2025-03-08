import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Book } from "../entity/book.entity";
import { BookDto } from "../dto/book.dto";
import { BookCategory } from "../entity/book-category.entity";
import { BookLocation } from "../entity/book-location.entity";
import { BookRepository } from "../repository/book.repository";
import { BookResponseDto } from "../dto/book-response.dto";

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: BookRepository,

    @InjectRepository(BookCategory)
    private readonly categoryRepository: Repository<BookCategory>,

    @InjectRepository(BookLocation)
    private readonly locationRepository: Repository<BookLocation>,
  ) {}

  async getBooksWithParams(
    search?: string,
    categoryId?: string,
    page = 0,
    limit = 10,
  ): Promise<{ books: BookResponseDto[]; total: number }> {
    const query = this.bookRepository
      .createQueryBuilder("book")
      .leftJoinAndSelect("book.category", "category") // Подтягиваем категорию
      .where("book.isDeleted = false");

    if (search) {
      query.andWhere(
        "(LOWER(book.title) LIKE LOWER(:search) OR :search = ANY(book.authors))",
        { search: `%${search}%` },
      );
    }

    if (categoryId) {
      query.andWhere("category.id = :categoryId", { categoryId });
    }

    const [books, total] = await query
      .skip(page * limit)
      .take(limit)
      .getManyAndCount();

    return { books: books.map((book) => new BookResponseDto(book)), total };
  }

  async getBookById(id: string): Promise<Book> {
    return this.bookRepository.findOneOrFail({
      where: { id },
      relations: ["category", "location"],
    });
  }

  async createBook(createBookDto: BookDto): Promise<Book> {
    const category = await this.categoryRepository.findOne({
      where: { id: createBookDto.categoryId },
    });
    if (!category) {
      throw new NotFoundException(
        `Категория с ID ${createBookDto.categoryId} не найдена`,
      );
    }

    const location = await this.locationRepository.findOne({
      where: { id: createBookDto.locationId },
    });
    if (!location) {
      throw new NotFoundException(
        `Расположение с ID ${createBookDto.locationId} не найдено`,
      );
    }

    const book = this.bookRepository.create({
      ...createBookDto,
      category,
      location,
    });

    return this.bookRepository.save(book);
  }

  async updateBook(id: string, updateBookDto: BookDto): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Книга с ID ${id} не найдена`);
    }

    if (updateBookDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateBookDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException(
          `Категория с ID ${updateBookDto.categoryId} не найдена`,
        );
      }
      book.category = category;
    }

    if (updateBookDto.locationId) {
      const location = await this.locationRepository.findOne({
        where: { id: updateBookDto.locationId },
      });
      if (!location) {
        throw new NotFoundException(
          `Расположение с ID ${updateBookDto.locationId} не найдена`,
        );
      }
      book.location = location;
    }

    Object.assign(book, updateBookDto);

    return this.bookRepository.save(book);
  }

  async deleteBook(id: string): Promise<void> {
    await this.bookRepository.update(id, { isDeleted: true });
  }
}
