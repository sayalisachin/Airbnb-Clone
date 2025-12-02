export interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  host: string;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  amenities: string[];
  description: string;
}
