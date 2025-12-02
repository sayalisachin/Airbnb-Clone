import { useState, useMemo } from 'react';
import { ListingCard } from '../components/ListingCard';
import { FilterPanel } from '../components/FilterPanel';
import { mockListings } from '../data/mockListings';
import { filterListings, FilterCriteria } from '../utils/filterListings';
import { Sliders } from 'lucide-react';

interface ListingPageProps {
  onSelectListing: (id: string) => void;
}

export function ListingPage({ onSelectListing }: ListingPageProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterCriteria>({
    checkIn: '',
    checkOut: '',
    locations: [],
    amenities: [],
  });

  const allLocations = Array.from(new Set(mockListings.map((l) => l.location))).sort();
  const allAmenities = Array.from(
    new Set(mockListings.flatMap((l) => l.amenities))
  ).sort();

  const filteredListings = useMemo(
    () => filterListings(mockListings, filters),
    [filters]
  );

  const handleFiltersChange = (newFilters: FilterCriteria) => {
    setFilters(newFilters);
  };

  const hasActiveFilters = filters.locations.length > 0 || filters.amenities.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Stay anywhere</h1>
        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              hasActiveFilters
                ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            Filters {hasActiveFilters && `(${filters.locations.length + filters.amenities.length})`}
          </button>
          {showFilters && (
            <div className="absolute top-12 right-0 z-20">
              <FilterPanel
                locations={allLocations}
                amenities={allAmenities}
                onFiltersChange={handleFiltersChange}
                onClose={() => setShowFilters(false)}
              />
            </div>
          )}
        </div>
      </div>

      {filteredListings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No listings match your filters. Try adjusting your search.
          </p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            Showing {filteredListings.length} of {mockListings.length} listings
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {filteredListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onClick={() => onSelectListing(listing.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
