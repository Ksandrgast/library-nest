import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BooksService } from "../service/books.service";
import { BookDto } from "../dto/book.dto";
import { BookResponseDto } from "../dto/book-response.dto";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "../decorators/roles.decorator";

@ApiTags("Books")
@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: "Получить список всех книг" })
  @ApiResponse({
    status: 200,
    description: "Список книг",
    type: [BookResponseDto],
  })
  async getAllBooks(): Promise<BookResponseDto[]> {
    const books = await this.booksService.getAllBooks();
    return books.map((book) => new BookResponseDto(book));
  }

  @Get(":id")
  @ApiOperation({ summary: "Получить информацию о книге по ID" })
  @ApiResponse({
    status: 200,
    description: "Информация о книге",
    type: BookResponseDto,
  })
  async getBookById(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<BookResponseDto> {
    const book = await this.booksService.getBookById(id);
    return new BookResponseDto(book);
  }

  @Post()
  @ApiOperation({ summary: "Добавить новую книгу" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("librarian")
  @ApiResponse({
    status: 201,
    description: "Книга добавлена",
    type: BookResponseDto,
  })
  async createBook(@Body() createBookDto: BookDto): Promise<BookResponseDto> {
    const book = await this.booksService.createBook(createBookDto);
    return new BookResponseDto(book);
  }

  @Put(":id")
  @ApiOperation({ summary: "Обновить данные книги" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("librarian")
  @ApiResponse({
    status: 200,
    description: "Книга обновлена",
    type: BookResponseDto,
  })
  async updateBook(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateBookDto: BookDto,
  ): Promise<BookResponseDto> {
    const book = await this.booksService.updateBook(id, updateBookDto);
    return new BookResponseDto(book);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Удалить книгу" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("librarian")
  @ApiResponse({ status: 204, description: "Книга удалена" })
  async deleteBook(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.booksService.deleteBook(id);
  }
}
