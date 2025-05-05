import { Router } from 'express';
import { register,login,forgotPassword,resetPassword,logout} from '../controllers/auth.controller.js';
import { validate } from '../validators/index.js';
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from '../validators/auth.validator.js';

const router = Router();

router.post('/register', validate(registerSchema),register);
router.post('/login', validate(loginSchema), login);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);
router.get('/logout',  logout);

export default router;

