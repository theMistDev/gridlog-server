import Redis from 'ioredis';
import * as dotenv from 'dotenv';
dotenv.config();

if (!process.env.WAFCONNECT_REDIS_URI) {
  throw new Error(
    'Invalid/Missing environment variable: "WAFCONNECT_REDIS_URL"'
  );
}

const client = new Redis(process.env.WAFCONNECT_REDIS_URI);
client.on('error', (error) => {
  console.log(`Redis error: ${error}`);
});

//export default client;
