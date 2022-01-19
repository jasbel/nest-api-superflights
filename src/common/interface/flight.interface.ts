import { IPassenger } from "src/common/interface/passenger.interface";
import { IWeather } from "./weather.interface";

export interface IFlightDTO extends Document {
  pilot: string;
  airplane: string;
  destinationCity: string;
  flightDAte: Date;
  passengers: IPassenger[];
  weather: IWeather[];
}