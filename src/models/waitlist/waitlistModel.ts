import mongoose, {
  Schema,
  SchemaTypes,
  model,
  Types,
  Document,
} from 'mongoose';

const models = mongoose.models;

export interface WaitListInterface extends Document {
  _id: Types.ObjectId;
  email: string;
  name: string;
}

const WaitListSchema: Schema = new Schema<WaitListInterface>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      min: 3,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
    },
  },
  { timestamps: true, collection: 'waitlist' }
);

export default models.WaitList ||
  model<WaitListInterface>('WaitList', WaitListSchema);
