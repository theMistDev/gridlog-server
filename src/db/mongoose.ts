import { ServerApiVersion } from 'mongodb';
import mongoose, { Error } from 'mongoose';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
};

mongoose.set('strictQuery', true);

const uri = process.env.WAFCONNECT_MONGODB_URI as string;

if (!uri) {
  throw new Error(
    'Invalid/Missing environment variable: "WAFCONNECT_MONGODB_URI"'
  );
}

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(uri, options);
    console.log('MongoDB Connection Successful');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
  }
};

export default mongoose;
