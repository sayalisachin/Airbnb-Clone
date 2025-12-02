import { X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FilterPanelProps {
  locations: string[];
  amenities: string[];
  onFiltersChange: (filters: {
    checkIn: string;
    checkOut: string;
    locations: string[];
    amenities: string[];
  }) => void;
  onClose: () => void;
}

export function FilterPanel({
  locations,
  amenities,
  onFiltersChange,
  onClose,
}: FilterPanelProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showAmenityDropdown, setShowAmenityDropdown] = useState(false);

  const handleLocationToggle = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleApplyFilters = () => {
    onFiltersChange({
      checkIn,
      checkOut,
      locations: selectedLocations,
      amenities: selectedAmenities,
    });
    onClose();
  };

  const handleClearFilters = () => {
    setCheckIn('');
    setCheckOut('');
    setSelectedLocations([]);
    setSelectedAmenities([]);
    onFiltersChange({
      checkIn: '',
      checkOut: '',
      locations: [],
      amenities: [],
    });
    onClose();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 space-y-6 max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Check-in</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Check-out</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
        />
      </div>

      <div>
        <button
          onClick={() => setShowLocationDropdown(!showLocationDropdown)}
          className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
        >
          <span className="text-sm font-medium">
            Locations {selectedLocations.length > 0 && `(${selectedLocations.length})`}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showLocationDropdown ? 'rotate-180' : ''}`} />
        </button>
        {showLocationDropdown && (
          <div className="absolute mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-md z-10">
            <div className="max-h-64 overflow-y-auto">
              {locations.map((location) => (
                <label
                  key={location}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedLocations.includes(location)}
                    onChange={() => handleLocationToggle(location)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm">{location}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => setShowAmenityDropdown(!showAmenityDropdown)}
          className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
        >
          <span className="text-sm font-medium">
            Amenities {selectedAmenities.length > 0 && `(${selectedAmenities.length})`}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showAmenityDropdown ? 'rotate-180' : ''}`} />
        </button>
        {showAmenityDropdown && (
          <div className="absolute mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-md z-10">
            <div className="max-h-64 overflow-y-auto">
              {amenities.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={handleClearFilters}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Clear
        </button>
        <button
          onClick={handleApplyFilters}
          className="flex-1 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors font-medium"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
