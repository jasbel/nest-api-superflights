import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { ILocation } from 'src/common/interface/location.interface';
import { IWeather } from 'src/common/interface/weather.interface';
import { FLIGHT } from 'src/common/models/models';
import { FlightDTO } from './dto/flight.dto';
import { IFlight } from './flight.interface';

@Injectable()
export class FlightService {
  constructor(@InjectModel(FLIGHT.name) private readonly model: Model<IFlight>) { }

  async getLocation(destinationCity: string): Promise<ILocation> {
    const { data } = await axios.get(`https://www.metaweather.com/api/location/search?query=${destinationCity}`)
    return data[0];
  }
  async getWeather(woeid: number, flightDate: Date): Promise<IWeather[]> {
    const dateFormat = moment.utc(flightDate).format();

    const year = dateFormat.substring(0, 4);
    const month = dateFormat.substring(5, 7);
    const day = dateFormat.substring(8, 10);

    const { data } = await axios.get(`https://www.metaweather.com/api/location/${woeid}/${year}/${month}/${day}`)
    return data;
  }

  assign({ _id, pilot, airplane, destinationCity, flightDate, passengers }: IFlight, weather: IWeather[]): IFlight {
    return Object.assign({
      _id, pilot, airplane, destinationCity, flightDate, passengers, weather
    })
  }

  async create(flightDTO: FlightDTO): Promise<IFlight> {
    const newFlight = new this.model(flightDTO);
    return await newFlight.save();
  }

  async findAll(): Promise<IFlight[]> {
    return await this.model.find().populate('passengers');
  }

  async findOne(id: string): Promise<IFlight> {
    const flight = await this.model.findById(id).populate('passengers')
    const location: ILocation = await this.getLocation(flight.destinationCity)
    const weather: IWeather[] = await this.getWeather(location.woeid, flight.flightDate);

    return this.assign(flight, weather);
  }

  async updateOne(id: string, flightDTO: FlightDTO): Promise<IFlight> {
    return await this.model.findByIdAndUpdate(id, flightDTO, { new: true });
  }

  async deleteOne(id: string): Promise<{ flight: IFlight, status: number, msg: string }> {
    const flight = await this.model.findByIdAndDelete(id);
    return { flight, status: HttpStatus.OK, msg: 'Vuelo elimado' };
  }

  async addPassenger(id: string, passengerId: string): Promise<IFlight> {
    return await this.model.findByIdAndUpdate(id, {
      $addToSet: { passengers: passengerId }
    }, { new: true }).populate('passengers')
  }
}
