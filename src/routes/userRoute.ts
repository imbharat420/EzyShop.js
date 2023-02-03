import { Router } from 'express';
import { UserCreate, UserPage } from '../controllers/user/userController';
import fileUpload from '../utils/fileUpload';
const router = Router();

router.get('/', UserPage);
router.post('/', fileUpload.single('file'), UserCreate);

export default router;
