import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, LessThan } from "typeorm";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Booking } from "../entity/booking.entity";
import { BookingStatus } from "../enums/booking-status.enum";

@Injectable()
export class BookingSchedulerService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
  ) {}

  // Запускаем каждый день в полночь
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updateExpiredBookings() {
    const today = new Date();

    // Обновляем статус всех бронирований, у которых endDate уже прошло
    await this.bookingRepo.update(
      { endDate: LessThan(today), status: BookingStatus.ACTIVE },
      { status: BookingStatus.EXPIRED },
    );

    console.log(`[SCHEDULER] Бронирования обновлены: ${today.toISOString()}`);
  }
}
