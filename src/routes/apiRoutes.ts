import { Router } from 'express';

import jwtChecker from '../middleware/jwtChecker';
import { AuthController } from '../controllers/authController';

const router = Router();
const auth = new AuthController();

//AUTH
router.route('/auth/login').post(jwtChecker, auth.loginController);
router.route('/auth/register').post(auth.registerController);

//USERDATA
router.route('/usersData/userData/:uid/update').put(jwtChecker);

export default router;
