
import bcrypt from 'bcrypt';
import generateToken from '../../utils/generateToken.js';
import prisma from '../../utils/prisma.js';
import { AppError } from '../../middleware/errorHandler.js';

//@type POST
//@route api/auth/register
//@desc Register a new user
//@access Public
export const register = async(req, res, next)=>{
    try{
        const {email,password,firstName,lastName,phoneNumber} = req.body;
        //check if user already exists
        const existingUser = await prisma.user.findUnique({
            where:{
                email
            }
        });
        if(existingUser){
            throw new AppError('User already exists',400);
        }   // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user
        const user = await prisma.user.create({
          data: {
            
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phoneNumber,
            notificationPrefs: {
              create: {} // Create default notification preferences
            }
          },

        });

      // Generate token
      generateToken(res,user)
        res.status(201).json({
            status: 'success',
            data: {
              user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
              }
        }})

    }
    catch(error){
        console.log(error);
        if(error instanceof AppError){
            return next(error);
        }
        next(new AppError('Internal server error',500));
    }
}

//@ type POST
//@route api/auth/login
//@desc Login user
//@access Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }
    
    // Generate token
    generateToken(res,user)
    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        }
      },
    });
  } catch (error) {
    next(error);
  }
};

//@ type Get
//@route api/auth/logout
//@desc Logout user
//@access Private
export const logout = async (req, res, next) => {
  try {
      res.clearCookie('jwt');
      res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};


export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      // Don't reveal if email exists or not for security
      return res.status(200).json({
        status: 'success',
        message: 'If your email exists in our system, you will receive reset instructions',
      });
    }
    
    // Generate reset token (would typically send email here)
    // For demo purposes, we'll just return a success message
    
    res.status(200).json({
      status: 'success',
      message: 'If your email exists in our system, you will receive reset instructions',
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    
    // In a real app, you would verify the token and find the user
    // For demo purposes, we'll return a success message
    
    res.status(200).json({
      status: 'success',
      message: 'Password has been reset successfully',
    });
  } catch (error) {
    next(error);
  }
};