import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PASSENGER } from 'src/common/models/models';
import { PassengerDTO } from './dto/passenger.dto';
import { IPassenger } from '../common/interface/passenger.interface';

@Injectable()
export class PassengerService {
  constructor(@InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>) {}
  async create(passengerDTO: PassengerDTO): Promise<IPassenger> {
    const newPassenger = new this.model(passengerDTO);

    return await newPassenger.save();
  }
  async findAll(): Promise<IPassenger[]> {
    const passengers = this.model.find();
    return await passengers;
  }
  async findOne(id: string): Promise<IPassenger> {
    const newPassenger = this.model.findById(id);
    return await newPassenger;
  }
  async updateOne(id: string, data: PassengerDTO): Promise<IPassenger> {
    return await this.model.findByIdAndUpdate(id, data, {new: true});
  }
  async deleteOne(id: string): Promise<{data: IPassenger, status: number, msg: string}> {
    const data =  await this.model.findByIdAndDelete(id);
    return {data, status: HttpStatus.OK, msg: 'Eliminado correctamente'};
  }
}
