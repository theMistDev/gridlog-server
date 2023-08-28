import * as dotenv from 'dotenv';
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import apiRoutes from '../routes/apiRoutes';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import pathLogger from '../middleware/pathLogger';
import logger from '../services/log';
import  myDataSource  from '../db/datasource';

dotenv.config();

const app = express();

// Add middleware for security, performance, validation, and logging
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      fontSrc: ["'self'"],
      imgSrc: ["'self'"],
      objectSrc: ["'none'"],
    },
  })
);
app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 60, // limit each IP to 60 requests per windowMs
    onLimitReached: function (req, res, options) {
      return res.json({
        success: false,
        message: 'Rate Limit Exceeded. Please try after some time.',
        data: {},
      });
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(
  cors({
    origin: ['https://api.wafconnect.com', 'https://www.wafconnect.com'],
  })
);
app.use(pathLogger);
//app.use('/v1', apiRoutes);
app.use(apiRoutes);

myDataSource.isInitialized

// Initialize database connection and start listening for requests.


const port = process.env.APP_PORT;
const publicAppToken = process.env.APP_PUBLIC_APP_TOKEN;

app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers['x-auth-token'] === publicAppToken) {
      console.log(req.url);

      next();
    } else {
      res.status(417).json({
        success: false,
        message:
          'Expectation Failed: The server cannot meet the requirements of the Expect request-header field',
      });
    }
  } catch (err) {
    logger.error('Auth error:', err);
    next(err);
  }
});

app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'WafConnect API',
    time: Date.now(),
  });
});

app.use((req: Request, res: Response) => {
  console.log(req.baseUrl);
  res.status(405).json({ success: false, message: 'No Route found' });
});

const server = app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});

const startTime = Date.now();
server.on('listening', () => {
  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;
  logger.info(`Server started in ${duration} seconds`);
});

// Catch unhandled errors and log them
process.on('uncaughtException', (err) => {
  logger.error('Unhandled exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled rejection:', err);
  process.exit(1);
});
