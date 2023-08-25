import { Request, Response } from 'express';
import { AuthManager } from '../managers/authManager';
import { BaseController } from './baseController';

export class AuthController extends BaseController {
  private authManager = new AuthManager();

  loginController = async (req: Request, res: Response) => {
    try {
      const { uid, token, emailVerified } = req.body;
      const data = await this.authManager.loginOnServer(
        uid,
        token,
        emailVerified
      );
      this.sendResponse(res, data);
    } catch (error) {
      this.sendError(res, error);
    }
  };

  registerController = async (req: Request, res: Response) => {
    try {
      const { email, firstName, lastName, department, level } = req.body;
      const data = await this.authManager.registerOnServer(
        email,
        firstName,
        lastName,
        department,
        level
      );
      this.sendResponse(res, data);
    } catch (error) {
      this.sendError(res, error);
    }
  };
}
