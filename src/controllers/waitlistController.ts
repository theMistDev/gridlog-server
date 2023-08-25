import { Request, Response } from 'express';
import { BaseController } from './baseController';
import { WaitListManager } from '../managers/waitlistManager';

export class WaitListController extends BaseController {
  private waitListManager = new WaitListManager();

  getCount = async (req: Request, res: Response) => {
    try {
      const data = await this.waitListManager.getCount();
      this.sendResponse(res, data);
    } catch (error) {
      this.sendError(res, error);
    }
  };

  addToWaitList = async (req: Request, res: Response) => {
    try {
      const { email, name } = req.body;
      const data = await this.waitListManager.addToWaitListManager(email, name);
      this.sendResponse(res, data);
    } catch (error) {
      this.sendError(res, error);
    }
  };

  searchFactory = async (req: Request, res: Response) => {
    try {
      const { query } = req.body;
      const data = await this.waitListManager.searchManager(query);
      this.sendResponse(res, data);
    } catch (error) {
      this.sendError(res, error);
    }
  };
}
