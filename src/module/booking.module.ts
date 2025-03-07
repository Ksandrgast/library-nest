import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "../entity/book.entity";
import { Booking } from "../entity/booking.entity";
import { BookingController } from "../api/booking.controller";
import { BookingService } from "../service/booking.service";
import { BookingSchedulerService } from "../shedulers/booking-scheduler.service";

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Book])],
  controllers: [BookingController],
  providers: [BookingService, BookingSchedulerService],
  exports: [BookingService],
})
export class BookingModule {}
