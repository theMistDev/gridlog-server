import { Router } from 'express';

import jwtChecker from '../middleware/jwtChecker';
import { AuthController } from '../controllers/authController';

const router = Router();
const auth = new AuthController();

//AUTH
router.route('/admin/auth/login').post(jwtChecker, auth.loginController);
router.route('/admin/auth/register').post(jwtChecker, auth.registerController);

//USERDATA
router.route('/usersData/userData/:uid/update').put(jwtChecker);

export default router;
