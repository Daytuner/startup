import { body } from 'express-validator';

export const registerSchema = {
  email: body('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  password: body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
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
};

export const loginSchema = {
  email: body('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  password: body('password')
    .notEmpty()
    .withMessage('Password is required'),
};

export const forgotPasswordSchema = {
  email: body('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
};

export const resetPasswordSchema = {
  token: body('token')
    .notEmpty()
    .withMessage('Token is required'),
  password: body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
};
