import { body } from 'express-validator';

export const createPropertySchema = {
  title: body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot be longer than 100 characters'),
  description: body('description')
    .notEmpty()
    .withMessage('Description is required'),
  price: body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  address: body('address')
    .notEmpty()
    .withMessage('Address is required'),
  city: body('city')
    .notEmpty()
    .withMessage('City is required'),
  state: body('state')
    .notEmpty()
    .withMessage('State is required')
    .isLength({ min: 2, max: 2 })
    .withMessage('State must be a 2-letter code'),
  zipCode: body('zipCode')
    .notEmpty()
    .withMessage('Zip code is required'),
  bedrooms: body('bedrooms')
    .notEmpty()
    .withMessage('Number of bedrooms is required')
    .isInt({ min: 0 })
    .withMessage('Bedrooms must be a non-negative integer'),
  bathrooms: body('bathrooms')
    .notEmpty()
    .withMessage('Number of bathrooms is required')
    .isFloat({ min: 0 })
    .withMessage('Bathrooms must be a non-negative number'),
  squareFeet: body('squareFeet')
    .notEmpty()
    .withMessage('Square feet is required')
    .isInt({ min: 1 })
    .withMessage('Square feet must be a positive integer'),
  propertyType: body('propertyType')
    .notEmpty()
    .withMessage('Property type is required')
    .isIn(['  INDIVIDUAL_HOUSE','VILLA','BUNGALOW', 'LAND', 'APARTMENT', 'OTHER'])
    .withMessage('Invalid property type'),
  listingType: body('listingType')
    .notEmpty()
    .withMessage('Listing type is required')
    .isIn(['FOR_SALE', 'FOR_RENT', 'SOLD', 'PENDING'])
    .withMessage('Invalid listing type'),
};

export const updatePropertySchema = {
  title: body('title')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Title cannot be longer than 100 characters'),
  price: body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  bedrooms: body('bedrooms')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Bedrooms must be a non-negative integer'),
  bathrooms: body('bathrooms')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Bathrooms must be a non-negative number'),
  squareFeet: body('squareFeet')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Square feet must be a positive integer'),
  propertyType: body('propertyType')
    .optional()
    .isIn(['  INDIVIDUAL_HOUSE','VILLA','BUNGALOW', 'LAND', 'APARTMENT', 'OTHER'])
    .withMessage('Invalid property type'),
  listingType: body('listingType')
    .optional()
    .isIn(['FOR_SALE', 'FOR_RENT', 'SOLD', 'PENDING'])
    .withMessage('Invalid listing type'),
  status: body('status')
    .optional()
    .isIn(['ACTIVE', 'PENDING', 'SOLD', 'INACTIVE', 'DRAFT'])
    .withMessage('Invalid status'),
};