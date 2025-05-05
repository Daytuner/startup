import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler.js';


export const authenticate = (req, res, next) => {
  try {
    // const authHeader = req.cookie.authorization;
    const token = req.cookies.jwt; 
    

    if (!token) {
      throw new AppError('No authentication token provided', 401);
    }
    
    // const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError('Invalid or expired token', 401));
  }
};


export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('User not authenticated', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('Not authorized to access this resource', 403));
    }

    next();
  };
};