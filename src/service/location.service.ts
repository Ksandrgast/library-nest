import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BookLocation } from "../entity/book-location.entity";
import { CreateLocationDto } from "../dto/create-location.dto";
import { UpdateLocationDto } from "../dto/update-location.dto";

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(BookLocation)
    private readonly locationRepository: Repository<BookLocation>,
  ) {}

  async createLocation(dto: CreateLocationDto): Promise<BookLocation> {
    const location = this.locationRepository.create(dto);
    return await this.locationRepository.save(location);
  }

  async getAllLocations(): Promise<BookLocation[]> {
    return await this.locationRepository.find();
  }

  async getLocationById(id: string): Promise<BookLocation> {
    const location = await this.locationRepository.findOne({ where: { id } });
    if (!location) {
      throw new NotFoundException(`Локация с id ${id} не найдена`);
    }
    return location;
  }

  async update(id: string, dto: UpdateLocationDto): Promise<BookLocation> {
    const location = await this.locationRepository.findOne({ where: { id } });
    if (!location) {
      throw new NotFoundException("Location not found");
    }

    Object.assign(location, dto);
    return this.locationRepository.save(location);
  }

  async deleteLocation(id: string): Promise<void> {
    const result = await this.locationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Локация с id ${id} не найдена`);
    }
  }
}
