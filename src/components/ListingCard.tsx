import { Star } from 'lucide-react';
import { Listing } from '../types/listing';

interface ListingCardProps {
  listing: Listing;
  onClick: () => void;
}

export function ListingCard({ listing, onClick }: ListingCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer group"
    >
      <div className="relative overflow-hidden rounded-xl mb-3">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="space-y-1">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-gray-900 line-clamp-1">
            {listing.location}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">{listing.rating}</span>
            <span className="text-sm text-gray-600">({listing.reviewCount})</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-1">{listing.title}</p>

        <div className="flex items-baseline gap-1 pt-1">
          <span className="font-semibold text-gray-900">${listing.price}</span>
          <span className="text-gray-600 text-sm">night</span>
        </div>
      </div>
    </div>
  );
}
