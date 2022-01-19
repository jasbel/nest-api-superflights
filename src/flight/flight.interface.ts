export interface IFlight extends Document {
    _id?: string;
    pilot: string;
    airplane: string;
    destinationCity: string;
    flightDate: Date;
    passengers: string[];
}