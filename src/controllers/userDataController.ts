import { Request, Response } from 'express';
import { BaseController } from './baseController';
import { UserDataManager } from '../managers/userDataManager';

export class UserDataController extends BaseController {
  private userDataManager = new UserDataManager();

  update = async (req: Request, res: Response) => {
    try {
      const { field, value, uid } = req.body;
      const data = await this.userDataManager.update(field, value, uid);
      this.sendResponse(res, data);
    } catch (error) {
      this.sendError(res, error);
    }
  };
}
