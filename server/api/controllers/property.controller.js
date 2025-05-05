import prisma from '../../utils/prisma.js';
import { AppError } from '../../middleware/errorHandler.js';




//@type GET
//@route api/property/getProperties
//@desc Get all properties with optional filters and pagination
//@access Public
export const getProperties = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort, ...filters } = req.query;
    
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;
    
    // Build where clause from filters
    const where = {};
    
    if (filters.minPrice || filters.maxPrice) {
      where.price = {};
      if (filters.minPrice) where.price.gte = Number(filters.minPrice);
      if (filters.maxPrice) where.price.lte = Number(filters.maxPrice);
    }
    
    if (filters.bedrooms) where.bedrooms = { gte: Number(filters.bedrooms) };
    if (filters.bathrooms) where.bathrooms = { gte: Number(filters.bathrooms) };
    if (filters.propertyType) where.propertyType = filters.propertyType;
    if (filters.listingType) where.listingType = filters.listingType;
    if (filters.city) where.city = { contains: filters.city, mode: 'insensitive' };
    if (filters.state) where.state = { equals: filters.state, mode: 'insensitive' };
    if (filters.zipCode) where.zipCode = { equals: filters.zipCode };
    
    // Default sorting
    let orderBy = { createdAt: 'desc' };
    if (sort === 'price_asc') orderBy = { price: 'asc' };
    if (sort === 'price_desc') orderBy = { price: 'desc' };
    
    // Get properties
    const properties = await prisma.property.findMany({
      where,
      include: {
        images: { take: 1 }, // Just the first image for listing preview
        features: true,
      },
      orderBy,
      skip,
      take: limitNum,
    });
    
    // Get total count for pagination
    const total = await prisma.property.count({ where });
    
    res.status(200).json({
      status: 'success',
      data: {
        properties,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

//@type GET
//@route api/property/getProperties/:id
//@desc Get property by ID
//@access Public
export const getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const property = await prisma.property.findUnique({
      where: { id }, // Treat id as a string
      include: {
        images: true,
        features: true,
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
            profileImage: true,
          },
        },
        openHouses: true,
        priceHistory: {
          orderBy: { date: 'desc' },
        },
      },
    });

    if (!property) {
      throw new AppError('Property not found', 404);
    }

    // Log view if IP or userId provided
    if (req.ip || req.user?.id) {
      await prisma.viewHistory.create({
        data: {
          propertyId: property.id, // Treat id as a string
          ipAddress: req.ip,
          userId: req.user?.id,
        },
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        property,
      },
    });
  } catch (error) {
    next(error);
  }
};

//@type POST
//@route  api/property/createProperty
//@desc Create a new property
//@access Private
export const createProperty = async (req, res, next) => {
  try {
    const { 
      title, description, price, address, city, state, zipCode, country,
      latitude, longitude, bedrooms, bathrooms, squareFeet, lotSize,
      yearBuilt, propertyType, listingType, features = []
    } = req.body;
    
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }
    
    // Create property
    const property = await prisma.property.create({
      data: {
        title,
        description,
        price,
        address,
        city,
        state,
        zipCode,
        country: country || 'INDIA',
        latitude,
        longitude,
        bedrooms,
        bathrooms,
        squareFeet,
        lotSize,
        yearBuilt,
        propertyType,
        listingType,
        ownerId: req.user.id,
        features: {
          create: features.map(feature => ({
            name: feature.name,
            value: feature.value,
            category: feature.category,
          })),
        },
        priceHistory: {
          create: {
            price,
            changeType: 'LISTED',
          },
        },
      },
    });
    
    res.status(201).json({
      status: 'success',
      data: {
        property,
      },
    });
  } catch (error) {
    next(error);
  }
};

//@type POST
//@route api/property/createProperty
//@desc Create a new property
//@access Private
export const updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { 
      title, description, price, address, city, state, zipCode, country, 
      latitude, longitude, bedrooms, bathrooms, squareFeet, lotSize, 
      yearBuilt, propertyType, listingType, status, features 
    } = req.body;

    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    // Check if property exists and belongs to user
    const existingProperty = await prisma.property.findUnique({
      where: { id }, // Treat id as a string
    });

    if (!existingProperty) {
      throw new AppError('Property not found', 404);
    }

    if (existingProperty.ownerId !== req.user.id && req.user.role !== 'ADMIN') {
      throw new AppError('Not authorized to update this property', 403);
    }

    // Check for price change to record in history
    if (price && price !== existingProperty.price) {
      const changeType = price > existingProperty.price ? 'PRICE_INCREASE' : 'PRICE_DECREASE';
      await prisma.priceHistory.create({
        data: {
          propertyId: id, // Treat id as a string
          price,
          changeType,
        },
      });
    }

    // Update property
    const property = await prisma.property.update({
      where: { id }, // Treat id as a string
      data: {
        title, description, price, address, city, state, zipCode, country,
        latitude, longitude, bedrooms, bathrooms, squareFeet, lotSize,
        yearBuilt, propertyType, listingType, status,
      },
    });

    // Update features if provided
    if (features && features.length > 0) {
      // Delete existing features
      await prisma.feature.deleteMany({
        where: { propertyId: id }, // Treat id as a string
      });

      // Create new features
      await prisma.feature.createMany({
        data: features.map(feature => ({
          name: feature.name,
          value: feature.value,
          category: feature.category,
          propertyId: id, // Treat id as a string
        })),
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        property,
      },
    });
  } catch (error) {
    next(error);
  }
};

//@type POST
//@route api/property/deleteProperty/:id
//@desc Delete a property 
//@access Private
export const deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    // Check if property exists and belongs to user
    const property = await prisma.property.findUnique({
      where: { id }, // Treat id as a string
    });

    if (!property) {
      throw new AppError('Property not found', 404);
    }

    if (property.ownerId !== req.user.id && req.user.role !== 'ADMIN') {
      throw new AppError('Not authorized to delete this property', 403);
    }

    await prisma.property.delete({
      where: { id }, // Treat id as a string
    });

    res.status(200).json({
      status: 'success',
      message: 'Property deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

//@type POST
//@route api/property/uploadPropertyImages/:id
//@desc Upload property images
//@access Private
export const uploadPropertyImages = async (req, res, next) => {
  try {
    const { id } = req.params;
    const files = req.files;
    
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }
    
    // Check if property exists and belongs to user
    const property = await prisma.property.findUnique({
      where: { id: Number(id) },
    });
    
    if (!property) {
      throw new AppError('Property not found', 404);
    }
    
    if (property.ownerId !== req.user.id && req.user.role !== 'ADMIN') {
      throw new AppError('Not authorized to update this property', 403);
    }
    
    // In a real app, you would upload these files to a cloud storage
    // For this example, we'll just use the file paths
    const images = await Promise.all(
      files.map(async (file) => {
        return prisma.propertyImage.create({
          data: {
            url: `/uploads/${file.filename}`,
            propertyId: Number(id),
          },
        });
      })
    );
    
    // Update featured image if none exists
    if (!property.featuredImage && images.length > 0) {
      await prisma.property.update({
        where: { id: Number(id) },
        data: {
          featuredImage: images[0].url,
        },
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        images,
      },
    });
  } catch (error) {
    next(error);
  }
};


//@type GET
//@route api/property/getFeaturedProperties
//@desc Get featured properties (most viewed or newest listings)
//@access Public
export const getFeaturedProperties = async (req, res, next) => {
  try {
    // Get properties with most views or newest listings
    const featuredProperties = await prisma.property.findMany({
      where: {
        status: 'ACTIVE',
      },
      include: {
        images: { take: 1 },
        _count: {
          select: { viewingHistory: true },
        },
      },
      orderBy: [
        { viewingHistory: { _count: 'desc' } },
        { createdAt: 'desc' },
      ],
      take: 6,
    });
    
    res.status(200).json({
      status: 'success',
      data: {
        properties: featuredProperties,
      },
    });
  } catch (error) {
    next(error);
  }
};
