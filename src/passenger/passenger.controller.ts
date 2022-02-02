import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { IPassenger } from '../common/interface/passenger.interface';
import { PassengerService } from './passenger.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PASSENGER } from 'src/common/models/models';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags(PASSENGER.name)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/passenger')
export class PassengerController {

  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  create(@Body() passengerDTO: PassengerDTO) {
    return this.passengerService.create(passengerDTO);
  }

  @Get()
  findAll() {
    return this.passengerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string ) {
    return this.passengerService.findOne(id);
  }

  @Put(':id')
  updateOne(@Param('id') id: string, @Body() data: PassengerDTO) {
    return this.passengerService.updateOne(id, data);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.passengerService.deleteOne(id);
  }
}
