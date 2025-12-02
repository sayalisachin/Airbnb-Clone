import { Listing } from '../types/listing';

export interface FilterCriteria {
  checkIn: string;
  checkOut: string;
  locations: string[];
  amenities: string[];
}

export function filterListings(listings: Listing[], filters: FilterCriteria): Listing[] {
  return listings.filter((listing) => {
    if (filters.locations.length > 0 && !filters.locations.includes(listing.location)) {
      return false;
    }

    if (filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every((amenity) =>
        listing.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
      );
      if (!hasAllAmenities) {
        return false;
      }
    }

    return true;
  });
}
