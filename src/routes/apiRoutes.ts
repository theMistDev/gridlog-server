import { Router } from 'express';

import jwtChecker from '../middleware/jwtChecker';
import { AuthController } from '../controllers/authController';
import { WaitListController } from '../controllers/waitlistController';

const router = Router();
const auth = new AuthController();
const waitlist = new WaitListController();

//AUTH
router.route('/admin/auth/login').post(jwtChecker, auth.loginController);
router.route('/admin/auth/register').post(jwtChecker, auth.registerController);

//USERDATA
router.route('/usersData/userData/:uid/update').put(jwtChecker);



//WWW
router.route('/www/waitlist/count').get(waitlist.getCount);
router.route('/www/waitlist/add').post(waitlist.addToWaitList);


export default router;
