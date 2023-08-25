import { createLogger } from 'bunyan';
import * as dotenv from 'dotenv';
dotenv.config();

const log = createLogger({ name: process.env.WAFCONNECT_APP_NAME || 'App' });

export default log;
