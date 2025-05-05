import { Router } from 'express';
import { 
  getProperties, 
  getPropertyById, 
  createProperty, 
  updateProperty, 
  deleteProperty, 
  uploadPropertyImages,
  getFeaturedProperties
} from '../controllers/property.controller.js';
import { authenticate, authorize } from '../../middleware/auth.js';
import { validate } from '../validators/index.js';
import { createPropertySchema, updatePropertySchema } from '../validators/property.validator.js';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getProperties);
router.get('/featured', getFeaturedProperties);
router.get('/:id', getPropertyById);

router.post('/createProperty', authenticate, validate(createPropertySchema), createProperty);
router.put('/:id', authenticate, validate(updatePropertySchema), updateProperty);
router.delete('/:id', authenticate, deleteProperty);
router.post('/:id/images', authenticate, upload.array('images', 10), uploadPropertyImages);

export default router;