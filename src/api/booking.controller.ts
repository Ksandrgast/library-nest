import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Patch,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { BookingService } from "../service/booking.service";
import { BookingResponseDto } from "../dto/booking-response.dto";
import { UserRole } from "../enums/user-role.enum";
import { CreateBookingDto } from "../dto/booking.dto";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "../decorators/roles.decorator";

@ApiTags("Bookings")
@ApiBearerAuth()
@Controller("bookings")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get("my")
  @ApiOperation({ summary: "Получение списка моих бронирований" })
  @Roles(UserRole.READER)
  @ApiResponse({ status: 200, type: [BookingResponseDto] })
  async getMyBookings(@Request() req) {
    const bookings = await this.bookingService.getUserBookings(req.user.id);
    return bookings.map((b) => new BookingResponseDto(b));
  }

  @ApiOperation({
    summary: "Получение всех бронирований (только для библиотекаря)",
  })
  @ApiResponse({ status: 200, type: [BookingResponseDto] })
  @Roles(UserRole.LIBRARIAN)
  @Get()
  async getAllBookings() {
    const bookings = await this.bookingService.getAllBookings();
    return bookings.map((b) => new BookingResponseDto(b));
  }

  @ApiOperation({ summary: "Создание бронирования" })
  @ApiResponse({ status: 201, type: BookingResponseDto })
  @Post()
  @Roles(UserRole.READER, UserRole.LIBRARIAN)
  async createBooking(@Request() req, @Body() dto: CreateBookingDto) {
    const booking = await this.bookingService.createBooking(req.user, dto);
    return new BookingResponseDto(booking);
  }

  @ApiOperation({ summary: "Отмена бронирования" })
  @ApiResponse({ status: 200 })
  @Delete(":id")
  @Roles(UserRole.LIBRARIAN)
  async cancelBooking(@Request() req, @Param("id") id: string) {
    return this.bookingService.cancelBooking(id);
  }

  @Patch("return/:id")
  @Roles(UserRole.READER, UserRole.LIBRARIAN)
  async returnBook(@Request() req, @Param("id") bookingId: string) {
    await this.bookingService.returnBook(bookingId, req.user);
    return { message: "Книга успешно возвращена" };
  }
}
