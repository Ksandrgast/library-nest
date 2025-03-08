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
  Query,
  ParseIntPipe,
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
  async getAllBooks(
    @Query("search") search?: string,
    @Query("category") categoryId?: string,
    @Query("page", ParseIntPipe) page = 0,
    @Query("limit", ParseIntPipe) limit = 10,
  ) {
    return this.booksService.getBooksWithParams(
      search,
      categoryId,
      page,
      limit,
    );
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
