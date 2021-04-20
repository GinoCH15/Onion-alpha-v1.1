import {Router} from 'express'
import accessController from '../controllers/access-controller'
import {isLogged} from '../middleware/auth'
import { isEmail } from '../middleware/isEmail';
import { validateRegister } from '../middleware/validateRegister';

const router: Router = Router();

router.get('/login', [isLogged], accessController.getLogIn);
router.post('/ingresar', [isEmail], accessController.postLogIn);
router.post('/registrar', [validateRegister], accessController.postSignUp);
router.get('/recuperar', accessController.getRecuperate);
router.post('/recuperar', accessController.postRecuperate);
router.get('/reiniciar/:token', accessController.getReset);
router.post('/reiniciar/:token', accessController.postReset);
router.get('/salir', accessController.logout);

export default router;