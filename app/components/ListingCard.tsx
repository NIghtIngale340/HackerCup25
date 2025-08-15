import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { Listing } from '../types/listing';

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
        ) : (
          <StarOutline key={i} className="h-4 w-4 text-gray-300" />
        )
      );
    }
    return stars;
  };

  return (
    <Link href={`/listing/${listing.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer">
        {/* Image */}
        <div className="relative h-48 w-full">
          <Image
            src={listing.images[0] || '/placeholder-image.jpg'}
            alt={listing.title}
            fill
            className="object-cover"
          />
          {/* Status Badge */}
          {listing.isRented && listing.acceptsRoommates && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Roommates Accepted
            </div>
          )}
          {!listing.isRented && (
            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Available
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{listing.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{listing.address}</p>
          <p className="text-blue-600 text-sm mb-2">{listing.schoolProximity}</p>
          
          {/* Price */}
          <p className="text-xl font-bold text-gray-900 mb-2">
            ₱{listing.price.toLocaleString()}/month
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {listing.rules.visitorsAllowed ? (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Visitors Allowed
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                No Visitors
              </span>
            )}
            {listing.rules.curfew && (
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                Curfew: {listing.rules.curfew}
              </span>
            )}
            {listing.amenities.slice(0, 2).map((amenity) => (
              <span key={amenity} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {amenity}
              </span>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex">{renderStars(Math.round(listing.avgRating))}</div>
            <span className="text-sm text-gray-600">
              {listing.avgRating.toFixed(1)} ({listing.totalReviews} reviews)
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}