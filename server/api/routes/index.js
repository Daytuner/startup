import {Router } from 'express';
import authRoutes from './auth.routes.js';
// import userRoutes from './user.routes.js';
import propertyRoutes from './property.routes.js';
// import serchRoutes from './search.routes.js';

const router  = Router();

router.use('/auth', authRoutes);
// router.use('/users', userRoutes);
router.use('/properties', propertyRoutes);
// router.use('/search', serachRoutes);

export default router;