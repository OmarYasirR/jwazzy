// First, import all document schemas
import user from './documents/user'
import destination from './documents/destination'
import tour from './documents/tour'
import booking from './documents/booking'
import category from './documents/category'
import review from './documents/review'
import payment from './documents/payment'

// Then import object types
import bookingReference from './objects/bookingReference'
import price from './objects/price'
import location from './objects/location'
import imageGallery from './objects/imageGallery'

export const schemaTypes = [
  // Document types
  user,
  destination,
  tour,
  booking,
  category,
  review,
  payment,
  
  // Object types
  bookingReference,
  price,
  location,
  imageGallery,
]