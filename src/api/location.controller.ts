import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LocationService } from "../service/location.service";
import { CreateLocationDto } from "../dto/create-location.dto";
import { UpdateLocationDto } from "../dto/update-location.dto";
import { LocationResponseDto } from "../dto/location-response.dto";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "../decorators/roles.decorator";

@ApiTags("Locations")
@Controller("locations")
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperation({ summary: "Создать новую локацию" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiResponse({ status: 201, type: LocationResponseDto })
  async create(@Body() dto: CreateLocationDto): Promise<LocationResponseDto> {
    const location = await this.locationService.createLocation(dto);
    return new LocationResponseDto(location);
  }

  @Get()
  @ApiOperation({ summary: "Получить все локации" })
  @ApiResponse({ status: 200, type: [LocationResponseDto] })
  async getAll(): Promise<LocationResponseDto[]> {
    const locations = await this.locationService.getAllLocations();
    return locations.map((location) => new LocationResponseDto(location));
  }

  @Get(":id")
  @ApiOperation({ summary: "Получить локацию по ID" })
  @ApiResponse({ status: 200, type: LocationResponseDto })
  async getById(@Param("id") id: string): Promise<LocationResponseDto> {
    const location = await this.locationService.getLocationById(id);
    return new LocationResponseDto(location);
  }

  @Put(":id")
  @ApiOperation({ summary: "Обновить локацию" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiResponse({ status: 200, type: LocationResponseDto })
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateLocationDto,
  ): Promise<LocationResponseDto> {
    const updatedLocation = await this.locationService.update(id, dto);
    return new LocationResponseDto(updatedLocation);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Удалить локацию" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiResponse({ status: 204 })
  async delete(@Param("id") id: string): Promise<void> {
    return this.locationService.deleteLocation(id);
  }
}
