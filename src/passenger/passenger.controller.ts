import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { IPassenger } from '../common/interface/passenger.interface';
import { PassengerService } from './passenger.service';

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
