import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Booking } from "../entity/booking.entity";
import { Book } from "../entity/book.entity";
import { CreateBookingDto } from "../dto/booking.dto";
import { User } from "../entity/user.entity";
import { UserRole } from "../enums/user-role.enum";
import { BookingStatus } from "../enums/booking-status.enum";
import { BookRepository } from "../repository/book.repository";

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking) private bookingRepo: Repository<Booking>,
    @InjectRepository(Book) private bookRepo: BookRepository,
  ) {}

  async getUserBookings(userId: string) {
    return this.bookingRepo.find({
      where: { user: { id: userId } },
      relations: ["book"],
      order: {
        status: "ASC",
      },
    });
  }

  async getAllBookings() {
    return this.bookingRepo.find({
      relations: ["book", "user"],
      order: {
        status: "ASC",
      },
    });
  }

  async createBooking(user: User, dto: CreateBookingDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { bookId, startDate, endDate } = dto;

    // Проверяем, существует ли книга
    const book = await this.bookRepo.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException("Книга не найдена");
    }

    // Проверяем, есть ли у пользователя активное бронирование этой книги
    const existingBooking = await this.bookingRepo.findOne({
      where: {
        user: { id: user.id },
        book: { id: bookId },
        status: BookingStatus.ACTIVE,
      },
    });

    if (existingBooking) {
      throw new BadRequestException(
        "У вас уже есть активное бронирование этой книги",
      );
    }

    // Проверяем доступное количество книг
    const activeBookings = await this.bookingRepo.count({
      where: {
        book: { id: bookId },
        endDate: new Date(),
        status: BookingStatus.ACTIVE,
      },
    });

    if (activeBookings >= book.quantity) {
      throw new BadRequestException("Нет доступных экземпляров книги");
    }

    // Создаем бронирование
    const booking = this.bookingRepo.create({
      book,
      user,
      startDate: new Date(),
      endDate: new Date(endDate),
      status: BookingStatus.ACTIVE,
    });

    await this.bookingRepo.save(booking);
    return booking;
  }

  async cancelBooking(bookingId: string) {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId, status: BookingStatus.ACTIVE },
      relations: ["user"],
    });

    if (!booking) {
      throw new NotFoundException("Бронирование не найдено");
    }

    await this.bookingRepo.remove(booking);
    return { message: "Бронирование отменено" };
  }

  async returnBook(bookingId: string, user: User): Promise<void> {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId, status: BookingStatus.ACTIVE },
      relations: ["user"],
    });

    if (!booking) {
      throw new NotFoundException("Бронирование не найдено");
    }

    if (booking.user.id !== user.id) {
      if (!user || user.role !== UserRole.LIBRARIAN) {
        throw new ForbiddenException(
          "Вы можете возвращать только свои бронирования",
        );
      }
    }

    if (booking.status === BookingStatus.RETURNED) {
      throw new ForbiddenException("Книга уже возвращена");
    }

    booking.status = BookingStatus.RETURNED;
    await this.bookingRepo.save(booking);
  }
}
