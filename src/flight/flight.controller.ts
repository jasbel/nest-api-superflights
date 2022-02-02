import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FLIGHT } from 'src/common/models/models';
import { PassengerService } from 'src/passenger/passenger.service';
import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';

@ApiTags(FLIGHT.name)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/flight')
export class FlightController {
  constructor(private readonly flightService: FlightService,
    private readonly passengerService: PassengerService,
    ) {}

  @Post()
  create(@Body() flightDTO: FlightDTO) {
    return this.flightService.create(flightDTO)
  }

  @Get()
  finAll() {
    return this.flightService.findAll();
  }

  @Get(':id')
  finOne(@Param('id') id: string) {
    return this.flightService.findOne(id);
  }

  @Put(':id')
  updateOne(@Param('id') id: string, @Body() flightDTO: FlightDTO) {
    return this.flightService.updateOne(id, flightDTO)
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.flightService.deleteOne(id);
  }

  @Post(':id/passenger/:passengerId')
  async addPassenger(@Param('id') id: string, @Param('passengerId') passengerId: string) {
    const passenger = await this.passengerService.findOne(passengerId);
    if (!passenger) throw new HttpException('Passenger Not Found', HttpStatus.NOT_FOUND);

    return this.flightService.addPassenger(id, passengerId);
  }
}
