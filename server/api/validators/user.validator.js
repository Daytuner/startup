import { body } from 'express-validator';

export const updateUserSchema = {
  firstName: body('firstName')
    .optional()
    .isString()
    .withMessage('First name must be a string'),
  lastName: body('lastName')
    .optional()
    .isString()
    .withMessage('Last name must be a string'),
  phoneNumber: body('phoneNumber')
    .optional()
    .isMobilePhone('any')
    .withMessage('Phone number must be valid'),
  email: body('email')
    .optional()
    .isEmail()
    .withMessage('Must be a valid email address'),
  currentPassword: body('currentPassword')
    .if(body('newPassword').exists())
    .notEmpty()
    .withMessage('Current password is required when changing password'),
  newPassword: body('newPassword')
    .optional()
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long'),
};
export const savePropertySchema = {
    propertyId: body('propertyId')
      .notEmpty()
      .withMessage('Property ID is required')
      .isInt()
      .withMessage('Property ID must be an integer'),
    notes: body('notes')
      .optional()
      .isString()
      .withMessage('Notes must be a string'),
  };

export const savedSearchSchema = {
    name: body('name')
      .optional()
      .isString()
      .withMessage('Name must be a string'),
    filters: body('filters')
      .notEmpty()
      .withMessage('Search filters are required')
      .isObject()
      .withMessage('Filters must be an object'),
  };
  
export const notificationPrefsSchema = {
    emailNotifications: body('emailNotifications')
      .optional()
      .isBoolean()
      .withMessage('Email notifications must be a boolean'),
    pushNotifications: body('pushNotifications')
      .optional()
      .isBoolean()
      .withMessage('Push notifications must be a boolean'),
    savedSearchAlerts: body('savedSearchAlerts')
      .optional()
      .isBoolean()
      .withMessage('Saved search alerts must be a boolean'),
    priceDropAlerts: body('priceDropAlerts')
      .optional()
      .isBoolean()
      .withMessage('Price drop alerts must be a boolean'),
    newListingAlerts: body('newListingAlerts')
      .optional()
      .isBoolean()
      .withMessage('New listing alerts must be a boolean'),
    openHouseReminders: body('openHouseReminders')
      .optional()
      .isBoolean()
      .withMessage('Open house reminders must be a boolean'),
  };
  