import { Router } from 'express';
import { LoginPage, LoginPost, RegisterPage, RegisterPost } from '../controllers/user/authController';
import fileUpload from '../utils/fileUpload';
const router = Router();

router.get(['/login','/signin'], LoginPage).post('/login', RegisterPost);
router.get(['/register','/signup'], RegisterPage).post('/register', LoginPost);



// router.post('/', fileUpload.single('file'), UserCreate);

export default router;
