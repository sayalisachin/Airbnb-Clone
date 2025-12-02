import { ArrowLeft, Star, Users, Bed, Bath, Wifi, Droplet, Waves, Home } from 'lucide-react';
import { useState } from 'react';
import { Listing } from '../types/listing';
import { DateRangePicker } from '../components/DateRangePicker';

interface DetailsPageProps {
  listing: Listing;
  onBack: () => void;
}

export function DetailsPage({ listing, onBack }: DetailsPageProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  const nights = calculateNights();
  const subtotal = listing.price * nights;
  const cleaningFee = 75;
  const serviceFee = Math.round(subtotal * 0.14);
  const total = subtotal + cleaningFee + serviceFee;

  const handleReserve = () => {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }
    if (nights <= 0) {
      alert('Check-out date must be after check-in date');
      return;
    }
    alert(`Booking confirmed! Total: $${total}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to listings</span>
        </button>

        <div className="mb-6">
          <h1 className="text-3xl font-semibold mb-2">{listing.title}</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-medium">{listing.rating}</span>
              <span className="text-gray-600">({listing.reviewCount} reviews)</span>
            </div>
            <span className="text-gray-600">{listing.location}</span>
          </div>
        </div>

        <div className="mb-8">
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-[500px] object-cover rounded-xl"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                Hosted by {listing.host}
              </h2>
              <div className="flex items-center gap-4 text-gray-700">
                <span>{listing.guests} guests</span>
                <span>·</span>
                <span>{listing.bedrooms} bedrooms</span>
                <span>·</span>
                <span>{listing.beds} beds</span>
                <span>·</span>
                <span>{listing.baths} baths</span>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">About this place</h3>
              <p className="text-gray-700 leading-relaxed">{listing.description}</p>
            </div>

            <div className="border-b border-gray-200 pb-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
              <div className="grid grid-cols-2 gap-4">
                {listing.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {getAmenityIcon(amenity)}
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="border border-gray-300 rounded-xl p-6 shadow-lg sticky top-24 space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold">${listing.price}</span>
                <span className="text-gray-600">night</span>
              </div>

              <DateRangePicker
                checkIn={checkIn}
                checkOut={checkOut}
                onCheckInChange={setCheckIn}
                onCheckOutChange={setCheckOut}
              />

              <div>
                <label className="block text-xs font-semibold mb-2">GUESTS</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-rose-500"
                >
                  {Array.from({ length: listing.guests }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleReserve}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 rounded-lg transition-colors mb-4"
              >
                Reserve
              </button>

              {nights > 0 && (
                <>
                  <p className="text-center text-sm text-gray-600 mb-4">
                    You won't be charged yet
                  </p>

                  <div className="space-y-3 border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-700 underline">
                        ${listing.price} x {nights} {nights === 1 ? 'night' : 'nights'}
                      </span>
                      <span className="text-gray-700">${subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 underline">Cleaning fee</span>
                      <span className="text-gray-700">${cleaningFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 underline">Service fee</span>
                      <span className="text-gray-700">${serviceFee}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-gray-200 font-semibold">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getAmenityIcon(amenity: string) {
  const iconClass = "w-5 h-5 text-gray-700";

  if (amenity.toLowerCase().includes('wifi')) return <Wifi className={iconClass} />;
  if (amenity.toLowerCase().includes('pool')) return <Waves className={iconClass} />;
  if (amenity.toLowerCase().includes('hot tub')) return <Droplet className={iconClass} />;
  if (amenity.toLowerCase().includes('kitchen')) return <Home className={iconClass} />;
  if (amenity.toLowerCase().includes('bedroom')) return <Bed className={iconClass} />;
  if (amenity.toLowerCase().includes('bath')) return <Bath className={iconClass} />;
  if (amenity.toLowerCase().includes('guest')) return <Users className={iconClass} />;

  return <Home className={iconClass} />;
}
