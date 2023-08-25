import mongoose, {
  Schema,
  SchemaTypes,
  model,
  Types,
  Document,
} from 'mongoose';

const models = mongoose.models;

export interface WaitListDumpInterface extends Document {
  _id: Types.ObjectId;
  Email_ID: string;
}

const WaitListDumpSchema: Schema = new Schema<WaitListDumpInterface>(
  {
    Email_ID: {
      type: String,
      required: true,
      trim: true,
      min: 3,
    },
  },
  { timestamps: true, collection: 'waitlist_dump' }
);

export default models.WaitListDump ||
  model<WaitListDumpInterface>('WaitListDump', WaitListDumpSchema);
