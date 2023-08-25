import { Response } from 'express';

interface SuccessData {
  success: boolean;
  message?: string;
  data?: any;
}

export class BaseController {
  protected sendResponse = async (res: Response, data: SuccessData) => {
    if (!data || !data.hasOwnProperty('success')) {
      throw new Error('Invalid data object provided');
    }

    const successData: SuccessData = {
      success: data.success,
      message: data.message || '',
      data: data.data || {},
    };

    res.json(successData);
  };

  protected sendError = async (res: Response, error?: any) => {
    res.json({
      success: false,
      message: `Error: ${error}`,
      error: error,
    });
  };
}
