import { Router } from 'express';
import { LoginPage, RegisterPage } from '../controllers/user/authController';
import fileUpload from '../utils/fileUpload';
const router = Router();

router.get('/login', LoginPage);
router.get('/register', RegisterPage);

// POST
router.post('/login', LoginPage);
router.post('/register', RegisterPage);


// router.post('/', fileUpload.single('file'), UserCreate);

export default router;
