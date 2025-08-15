'use client';
import { useState } from 'react';

interface FilterOptions {
  visitorsAllowed?: boolean;
  hasCurfew?: boolean;
  acceptsRoommates?: boolean;
  priceRange: [number, number];
  genderPolicy?: 'Male' | 'Female' | 'All';
  amenities: string[];
}

interface FilterSidebarProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [3000, 15000],
    amenities: [],
  });

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      {/* Visitors Policy */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Visitors Policy</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="visitors"
              className="mr-2"
              onChange={() => handleFilterChange({ visitorsAllowed: undefined })}
            />
            Any
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="visitors"
              className="mr-2"
              onChange={() => handleFilterChange({ visitorsAllowed: true })}
            />
            Visitors Allowed
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="visitors"
              className="mr-2"
              onChange={() => handleFilterChange({ visitorsAllowed: false })}
            />
            No Visitors
          </label>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Price Range</h4>
        <div className="space-y-2">
          <input
            type="range"
            min="3000"
            max="15000"
            step="500"
            value={filters.priceRange[1]}
            onChange={(e) => 
              handleFilterChange({ 
                priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
              })
            }
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₱{filters.priceRange[0].toLocaleString()}</span>
            <span>₱{filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Roommates */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            onChange={(e) => 
              handleFilterChange({ acceptsRoommates: e.target.checked })
            }
          />
          Accepting Roommates
        </label>
      </div>

      {/* Gender Policy */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Gender Policy</h4>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => 
            handleFilterChange({ 
              genderPolicy: e.target.value as 'Male' | 'Female' | 'All' 
            })
          }
        >
          <option value="">Any</option>
          <option value="All">All Genders</option>
          <option value="Male">Male Only</option>
          <option value="Female">Female Only</option>
        </select>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Amenities</h4>
        <div className="space-y-2">
          {['WiFi', 'Laundry', 'Kitchen', 'Parking', 'AC', 'Security'].map((amenity) => (
            <label key={amenity} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                onChange={(e) => {
                  const newAmenities = e.target.checked
                    ? [...filters.amenities, amenity]
                    : filters.amenities.filter(a => a !== amenity);
                  handleFilterChange({ amenities: newAmenities });
                }}
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}