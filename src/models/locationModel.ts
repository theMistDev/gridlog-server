import mongoose, {
  Schema,
  SchemaTypes,
  model,
  Types,
  Document,
} from 'mongoose';
import { z } from 'zod';

const models = mongoose.models;

export const locationStateZodSchema = z.object({
  state: z.string().min(2).max(15),
});

export interface LocationInterface {
  id: number;
  name: string;
  value: string;
  region: {
    id: number;
    name: string;
    value: string;
  }[];
}

const LocationSchema: Schema = new Schema<LocationInterface>(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
      type: String,
      required: true,
      unique: true,
    },
    region: {
      type: [
        {
          id: {
            type: Number,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          value: {
            type: String,
            required: true,
          },
        },
      ],
    },
  },
  {
    collection: 'locations',
  }
);

export default models.Location
  ? model<LocationInterface & Document>('Location')
  : model<LocationInterface & Document>('Location', LocationSchema);
