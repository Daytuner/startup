import { AppError } from '../../middleware/errorHandler.js';
import prisma from '../../utils/prisma.js';
import bcrypt from 'bcrypt';


//@type GET
//@route api/user/me
//@desc Get user profile    
//@access Private
export const getUser = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }
    
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        notificationPrefs: true,
      },
    });
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    
    res.status(200).json({
      status: 'success',
      data: {
        user: userWithoutPassword,
      },
    });
  } catch (error) {
    next(error);
  }
};

//@type PUT
//@route api/user/me
//@desc Update user profile
//@access Private
export const updateUser = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }
    
    const { firstName, lastName, phoneNumber, email, currentPassword, newPassword } = req.body;
    
    // If changing email, check if it's already in use
    if (email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      
      if (existingUser && existingUser.id !== req.user.id) {
        throw new AppError('Email already in use', 400);
      }
    }
    
    // If changing password, verify current password
    if (newPassword) {
      if (!currentPassword) {
        throw new AppError('Current password is required to set a new password', 400);
      }
      
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
      });
      
      if (!user) {
        throw new AppError('User not found', 404);
      }
      
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      
      if (!isPasswordValid) {
        throw new AppError('Current password is incorrect', 401);
      }
    }
    
    // Build update data
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (email) updateData.email = email;
    if (newPassword) updateData.password = await bcrypt.hash(newPassword, 10);
    
    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
    });
    
    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;
    
    res.status(200).json({
      status: 'success',
      data: {
        user: userWithoutPassword,
      },
    });
  } catch (error) {
    next(error);
  }
};

//@type DELETE
//@route api/useR/me
//@desc Delete user account
//@access Private
export const deleteUser = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }
    
    await prisma.user.delete({
      where: { id: req.user.id },
    });
    
    res.status(200).json({
      status: 'success',
      message: 'User account deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};


//@type GET
//@route api/user/me/saved-properties
//@desc Get saved properties
//@access Private  
export const getSavedProperties = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }
    
    const savedProperties = await prisma.savedProperty.findMany({
      where: { userId: req.user.id },
      include: {
        property: {
          include: {
            images: { take: 1 },
            features: true,
          },
        },
      },
    });
    
    res.status(200).json({
      status: 'success',
      data: {
        savedProperties,
      },
    });
  } catch (error) {
    next(error);
  }
};

//@type POST
//@route api/user/me/saved-properties
//@desc Save property
//@access Private
export const saveProperty = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }
    
    const { propertyId, notes } = req.body;
    
    // Check if property exists
    const property = await prisma.property.findUnique({
      where: { id: Number(propertyId) },
    });
    
    if (!property) {
      throw new AppError('Property not found', 404);
    }
    
    // Check if already saved
    const existingSave = await prisma.savedProperty.findFirst({
      where: {
        userId: req.user.id,
        propertyId: Number(propertyId),
      },
    });
    
    if (existingSave) {
      throw new AppError('Property already saved', 400);
    }
    
    // Save property
    const savedProperty = await prisma.savedProperty.create({
      data: {
        userId: req.user.id,
        propertyId: Number(propertyId),
        notes,
      },
      include: {
        property: true,
      },
    });
    
    res.status(201).json({
      status: 'success',
      data: {
        savedProperty,
      },
    });
  } catch (error) {
    next(error);
  }
};

//@type DELETE
//@route api/user/me/saved-properties/:propertyId
//@desc Remove saved property
//@access Private
export const removeSavedProperty = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }
    
    const { propertyId } = req.params;
    
    // Delete saved property
    await prisma.savedProperty.deleteMany({
      where: {
        userId: req.user.id,
        propertyId: Number(propertyId),
      },
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Property removed from saved properties',
    });
  } catch (error) {
    next(error);
  }
};


//@type GET
//@route api/user/me/saved-searches
//@desc Get saved searches
//@access Private
export const getSavedSearches = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }
    
    const savedSearches = await prisma.savedSearch.findMany({
      where: { userId: req.user.id },
    });
    
    res.status(200).json({
      status: 'success',
      data: {
        savedSearches,
      },
    });
  } catch (error) {
    next(error);
  }
};


//@type POST
//@route api/user/me/saved-searches
//@desc Create saved search
//@access Private
export const createSavedSearch = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }
    
    const { name, filters } = req.body;
    
    const savedSearch = await prisma.savedSearch.create({
      data: {
        userId: req.user.id,
        name,
        filters,
      },
    });
    
    res.status(201).json({
      status: 'success',
      data: {
        savedSearch,
      },
    });
  } catch (error) {
    next(error);
  }
};

//@type DELETE
//@route api/user/me/saved-searches/:searchId
//@desc Delete saved search
//@access Private
export const deleteSavedSearch = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }
    
    const { searchId } = req.params;
    
    // Check if saved search exists and belongs to user
    const savedSearch = await prisma.savedSearch.findUnique({
      where: { id: Number(searchId) },
    });
    
    if (!savedSearch) {
      throw new AppError('Saved search not found', 404);
    }
    
    if (savedSearch.userId !== req.user.id) {
      throw new AppError('Not authorized to delete this saved search', 403);
    }
    
    // Delete saved search
    await prisma.savedSearch.delete({
      where: { id: Number(searchId) },
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Saved search deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

//@type PUT
//@route api/user/me/notification-preferences
//@desc Update notification preferences
//@access Private
export const updateNotificationPreferences = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }
    
    const {
      emailNotifications,
      pushNotifications,
      savedSearchAlerts,
      priceDropAlerts,
      newListingAlerts,
      openHouseReminders,
    } = req.body;
    
    // Update notification preferences
    const notificationPrefs = await prisma.notificationPref.upsert({
      where: { userId: req.user.id },
      update: {
        emailNotifications,
        pushNotifications,
        savedSearchAlerts,
        priceDropAlerts,
        newListingAlerts,
        openHouseReminders,
      },
      create: {
        userId: req.user.id,
        emailNotifications,
        pushNotifications,
        savedSearchAlerts,
        priceDropAlerts,
        newListingAlerts,
        openHouseReminders,
      },
    });
    
    res.status(200).json({
      status: 'success',
      data: {
        notificationPrefs,
      },
    });
  } catch (error) {
    next(error);
  }
};