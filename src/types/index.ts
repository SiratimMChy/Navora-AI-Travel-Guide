export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: "user" | "admin";
  createdAt?: Date;
}

export interface Destination {
  _id?: string;
  title: string;
  description: string;
  location: string;
  country: string;
  category: "beach" | "mountain" | "city" | "adventure" | "cruise";
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  images?: string[];
  featured?: boolean;
  popular?: boolean;
  duration?: string;
  tags?: string[];
  createdAt?: Date;
}

export interface Booking {
  _id?: string;
  userId: string;
  destinationId: string;
  destination?: Destination;
  travelers: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "rejected";
  travelDate: Date;
  rejectionReason?: string;
  paid?: boolean;
  createdAt?: Date;
}

export interface Review {
  _id?: string;
  userId: string;
  userName: string;
  userImage?: string;
  destinationId: string;
  rating: number;
  comment: string;
  createdAt?: Date;
}

export interface BlogPost {
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  readTime?: string;
  featured?: boolean;
  createdAt?: Date;
}
