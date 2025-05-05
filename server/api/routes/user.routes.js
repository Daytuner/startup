import { Router } from 'express';
import { 
  getUser, 
  updateUser, 
  deleteUser, 
  getSavedProperties, 
  saveProperty, 
  removeSavedProperty,
  getSavedSearches,
  createSavedSearch,
  deleteSavedSearch,
  updateNotificationPreferences
} from '../controllers/user.controller';
import { authenticate } from '../../middleware/auth';
import { validate } from '../validators';
import { updateUserSchema, savePropertySchema, savedSearchSchema, notificationPrefsSchema } from '../validators/user.validator';

const router = Router();

router.get('/me', authenticate, getUser);
router.put('/me', authenticate, validate(updateUserSchema), updateUser);
router.delete('/me', authenticate, deleteUser);

router.get('/me/saved-properties', authenticate, getSavedProperties);
router.post('/me/saved-properties', authenticate, validate(savePropertySchema), saveProperty);
router.delete('/me/saved-properties/:propertyId', authenticate, removeSavedProperty);

router.get('/me/saved-searches', authenticate, getSavedSearches);
router.post('/me/saved-searches', authenticate, validate(savedSearchSchema), createSavedSearch);
router.delete('/me/saved-searches/:searchId', authenticate, deleteSavedSearch);

router.put('/me/notification-preferences', authenticate, validate(notificationPrefsSchema), updateNotificationPreferences);

export default router;