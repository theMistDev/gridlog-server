import { NextFunction, Request, Response } from 'express';
import log from '../services/log';

function pathLogger(req: Request, res: Response, next: NextFunction) {

const now = new Date();
const time = now.toLocaleTimeString('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
});






  log.info(time, req.method, req.originalUrl);

  next();
}

export default pathLogger;
