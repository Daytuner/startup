
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  firstName: 'firstName',
  lastName: 'lastName',
  phoneNumber: 'phoneNumber',
  profileImage: 'profileImage',
  role: 'role',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PropertyScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  price: 'price',
  address: 'address',
  city: 'city',
  state: 'state',
  zipCode: 'zipCode',
  country: 'country',
  latitude: 'latitude',
  longitude: 'longitude',
  bedrooms: 'bedrooms',
  bathrooms: 'bathrooms',
  squareFeet: 'squareFeet',
  lotSize: 'lotSize',
  yearBuilt: 'yearBuilt',
  propertyType: 'propertyType',
  listingType: 'listingType',
  status: 'status',
  featuredImage: 'featuredImage',
  ownerId: 'ownerId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PropertyImageScalarFieldEnum = {
  id: 'id',
  url: 'url',
  caption: 'caption',
  propertyId: 'propertyId',
  createdAt: 'createdAt'
};

exports.Prisma.FeatureScalarFieldEnum = {
  id: 'id',
  name: 'name',
  value: 'value',
  category: 'category',
  propertyId: 'propertyId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SavedPropertyScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  propertyId: 'propertyId',
  createdAt: 'createdAt',
  notes: 'notes'
};

exports.Prisma.SavedSearchScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  filters: 'filters',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReviewScalarFieldEnum = {
  id: 'id',
  rating: 'rating',
  comment: 'comment',
  userId: 'userId',
  propertyId: 'propertyId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OpenHouseScalarFieldEnum = {
  id: 'id',
  propertyId: 'propertyId',
  startTime: 'startTime',
  endTime: 'endTime',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  senderId: 'senderId',
  recipientId: 'recipientId',
  content: 'content',
  read: 'read',
  createdAt: 'createdAt'
};

exports.Prisma.ViewHistoryScalarFieldEnum = {
  id: 'id',
  ipAddress: 'ipAddress',
  userId: 'userId',
  propertyId: 'propertyId',
  viewedAt: 'viewedAt'
};

exports.Prisma.PriceHistoryScalarFieldEnum = {
  id: 'id',
  propertyId: 'propertyId',
  price: 'price',
  date: 'date',
  changeType: 'changeType'
};

exports.Prisma.NotificationPrefScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  emailNotifications: 'emailNotifications',
  pushNotifications: 'pushNotifications',
  savedSearchAlerts: 'savedSearchAlerts',
  priceDropAlerts: 'priceDropAlerts',
  newListingAlerts: 'newListingAlerts',
  openHouseReminders: 'openHouseReminders'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.UserRole = exports.$Enums.UserRole = {
  USER: 'USER',
  AGENT: 'AGENT',
  ADMIN: 'ADMIN'
};

exports.PropertyType = exports.$Enums.PropertyType = {
  SINGLE_FAMILY: 'SINGLE_FAMILY',
  CONDO: 'CONDO',
  TOWNHOUSE: 'TOWNHOUSE',
  MULTI_FAMILY: 'MULTI_FAMILY',
  LAND: 'LAND',
  APARTMENT: 'APARTMENT',
  OTHER: 'OTHER'
};

exports.ListingType = exports.$Enums.ListingType = {
  FOR_SALE: 'FOR_SALE',
  FOR_RENT: 'FOR_RENT',
  SOLD: 'SOLD',
  PENDING: 'PENDING'
};

exports.PropertyStatus = exports.$Enums.PropertyStatus = {
  ACTIVE: 'ACTIVE',
  PENDING: 'PENDING',
  SOLD: 'SOLD',
  INACTIVE: 'INACTIVE',
  DRAFT: 'DRAFT'
};

exports.Prisma.ModelName = {
  User: 'User',
  Property: 'Property',
  PropertyImage: 'PropertyImage',
  Feature: 'Feature',
  SavedProperty: 'SavedProperty',
  SavedSearch: 'SavedSearch',
  Review: 'Review',
  OpenHouse: 'OpenHouse',
  Message: 'Message',
  ViewHistory: 'ViewHistory',
  PriceHistory: 'PriceHistory',
  NotificationPref: 'NotificationPref'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
