import { NextFunction, Request, Response } from 'express';
import firebaseAdmin from '../services/firebase';
import { log } from 'console';

const checkJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('starting jwt check');
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log('jwt error 1', authHeader);
      return res.status(400).json({
        success: false,
        message: 'Authorization header is missing',
      });
    }
    const [, token] = authHeader.split(' ');
    if (!token) {
      console.log('jwt error 2');
      return res.status(401).json({
        success: false,
        message: 'JWT Token is missing',
      });
    }

    const user = await firebaseAdmin.auth().verifyIdToken(token);

    if (!user) {
      console.log('do something about this jwt checker error');
      return res.status(401).json({
        success: false,
        message: 'JWT Token did not verify',
      });
    }
    //TODO: handle the req.user later

    //req.decodedToken = decodedToken;
    console.log('jwt validated...going to next');
    next();
  } catch (error) {
    console.log('jwt error 3');
    console.log('error verifying token', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid JWT Token',
    });
  }
};

// const checkJWT = async (req: Request, res: Response, next: NextFunction) => {
//   console.log('reqq', req.body);
//   return res.status(400).json({
//     success: false,
//     message: 'Authorization header is missing',
//     data: {},
//   });
// };

export default checkJWT;
