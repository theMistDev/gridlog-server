import mongoose, {
  Schema,
  SchemaTypes,
  model,
  Types,
  Document,
} from 'mongoose';
import { z } from 'zod';

const models = mongoose.models;

export const carMakeZodSchema = z.object({
  make: z.string().min(2).max(15),
});

export const carYearZodSchema = z.object({
  year: z.number().int().min(1992).max(2024),
});

export interface VINDataInterface {
  vin: string;
  year: string;
  make: string;
  model: string;
}

export interface WAFCONNECTInterface {
  owner: string;
}

export interface CarInterface {
  WAFCONNECT: WAFCONNECTInterface;
  vinData: VINDataInterface;
}

const CarSchema: Schema = new Schema<CarInterface>(
  {
    vinData: {
      vin: {
        type: String,
        required: true,
        unique: true,
      },
      year: {
        type: String,
        required: true,
      },
      make: {
        type: String,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
    },
    WAFCONNECT: {
      owner: {
        type: String,
        required: true,
      },
    },
  },
  {
    collection: 'cars',
  }
);

export default models.Car
  ? model<CarInterface & Document>('Car')
  : model<CarInterface & Document>('Car', CarSchema);
