import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocationController } from "../api/location.controller";
import { LocationService } from "../service/location.service";
import { BookLocation } from "../entity/book-location.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BookLocation])],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
