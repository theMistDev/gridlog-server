// import { Request, Response, NextFunction } from 'express';
// import { fromZodError } from 'zod-validation-error';
// import { locationStateZodSchema } from '../models/locationModel';
// import { carMakeZodSchema, carYearZodSchema } from '../models/carModel';
// import * as z from 'zod';

// const locationStateSchemaValidation = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     locationStateZodSchema.parse(req.params);
//     next();
//   } catch (error: any) {
//     const validationError = fromZodError(error);
//     res.json({
//       success: false,
//       message: validationError.message,
//       validationError,
//     });
//   }
// };


// const carYearSchemaValidation = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const yearParam = req.params.year;
//     const year = parseInt(yearParam, 10);

//     carYearZodSchema.parse({ year });
//     next();
//   } catch (error: any) {
//     const validationError = fromZodError(error);
//     res.json({
//       success: false,
//       message: validationError.message,
//       validationError,
//     });
//   }
// };

// const carMakeSchemaValidation = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     carMakeZodSchema.parse(req.params);
//     next();
//   } catch (error: any) {
//     const validationError = fromZodError(error);
//     res.json({
//       success: false,
//       message: validationError.message,
//       validationError,
//     });
//   }
// };

// const vinSchemaValidation = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { vin } = req.params;

//     vinZodSchema.parse(vin);
//     next();
//   } catch (error: any) {
//     if (error instanceof z.ZodError) {
//       const validationError = fromZodError(error);
//       return res.json({
//         success: false,
//         message: validationError.message,
//       });
//     }
//     throw error;
//   }
// };

// export default {
//   vinSchemaValidation,
//   locationStateSchemaValidation,
//   carYearSchemaValidation,
//   carMakeSchemaValidation,
// };
