export interface Listing {
  id: string;
  title: string;
  images: string[]; // URLs
  address: string;
  price: number;
  description: string;
  schoolProximity: string; // e.g., "UP Diliman - 5 min walk"
  rules: {
    visitorsAllowed: boolean;
    curfew?: string; // e.g., "22:00"
    genderRestricted?: "Male" | "Female" | "All";
  };
  amenities: string[]; // e.g., "WiFi", "Laundry", "Kitchen"
  isRented: boolean;
  acceptsRoommates: boolean;
  landlordId: string;
  avgRating: number;
  totalReviews: number;
  createdAt: string;
}