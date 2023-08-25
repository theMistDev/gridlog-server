import mongoose, {
  Schema,
  SchemaTypes,
  model,
  Types,
  Document,
} from 'mongoose';
import { z } from 'zod';

const models = mongoose.models;

export interface StaffInterface extends Document {
  _id: Types.ObjectId;
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  department: string;
  level: string;
  emailVerified: boolean;
  disabled: boolean;
}

const StaffSchema: Schema = new Schema<StaffInterface>(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      min: 3,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 30,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 30,
    },
    department: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 30,
    },
    level: {
      type: String,
      required: true,
      trim: true,
    },

    emailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: true,
    },

    //  image: {
    //    type: String,
    //    trim: true,
    //  },

    //  phone: {
    //    type: String,
    //    required: false,
    //    trim: true,
    //    min: 10,
    //    max: 15,
    //  },
  },
  { timestamps: true, collection: 'staff' }
);

export default models.Staff || model<StaffInterface>('Staff', StaffSchema);
