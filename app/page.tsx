'use client';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ListingCard from './components/ListingCard';
import FilterSidebar from './components/FilterSidebar';
import { Listing } from './types/listing';

// Mock data for now - replace with Firebase later
const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Cozy Dorm Near UP Diliman',
    images: ['/placeholder-dorm1.jpg'],
    address: 'Quezon City, Manila',
    price: 8000,
    description: 'Clean and affordable dorm perfect for students',
    schoolProximity: 'UP Diliman - 5 min walk',
    rules: {
      visitorsAllowed: true,
      curfew: '22:00',
      genderRestricted: 'All',
    },
    amenities: ['WiFi', 'Laundry', 'Kitchen'],
    isRented: false,
    acceptsRoommates: false,
    landlordId: 'landlord1',
    avgRating: 4.5,
    totalReviews: 12,
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    title: 'Modern Studio Apartment',
    images: ['/placeholder-apartment1.jpg'],
    address: 'Taft Avenue, Manila',
    price: 12000,
    description: 'Fully furnished studio apartment near DLSU',
    schoolProximity: 'DLSU - 10 min walk',
    rules: {
      visitorsAllowed: false,
      genderRestricted: 'Female',
    },
    amenities: ['WiFi', 'AC', 'Security', 'Parking'],
    isRented: true,
    acceptsRoommates: true,
    landlordId: 'landlord2',
    avgRating: 4.8,
    totalReviews: 8,
    createdAt: '2024-01-02',
  },
];

export default function Home() {
  const [listings, setListings] = useState<Listing[]>(mockListings);
  const [filteredListings, setFilteredListings] = useState<Listing[]>(mockListings);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterListings(query, listings);
  };

  const handleFilterChange = (filters: any) => {
    // Apply filters logic here
    let filtered = listings;

    if (searchQuery) {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.schoolProximity.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.visitorsAllowed !== undefined) {
      filtered = filtered.filter(listing => listing.rules.visitorsAllowed === filters.visitorsAllowed);
    }

    if (filters.acceptsRoommates) {
      filtered = filtered.filter(listing => listing.acceptsRoommates);
    }

    if (filters.priceRange) {
      filtered = filtered.filter(listing => 
        listing.price >= filters.priceRange[0] && listing.price <= filters.priceRange[1]
      );
    }

    setFilteredListings(filtered);
  };

  const filterListings = (query: string, listingsToFilter: Listing[]) => {
    if (!query) {
      setFilteredListings(listingsToFilter);
      return;
    }

    const filtered = listingsToFilter.filter(listing =>
      listing.title.toLowerCase().includes(query.toLowerCase()) ||
      listing.address.toLowerCase().includes(query.toLowerCase()) ||
      listing.schoolProximity.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredListings(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Find Your Perfect Student Housing
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Discover affordable dorms and apartments near Manila's top universities
            </p>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>

          {/* Listings Grid */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {filteredListings.length} Properties Found
              </h2>
              {searchQuery && (
                <p className="text-gray-600 mt-1">
                  Showing results for "{searchQuery}"
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            {filteredListings.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No properties found matching your criteria.
                </p>
                <p className="text-gray-400 mt-2">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}