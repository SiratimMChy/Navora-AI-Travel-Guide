import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import PopularDestinations from "@/components/home/PopularDestinations";
import FeaturedTours from "@/components/home/FeaturedTours";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import Blog from "@/components/home/Blog";
import FAQ from "@/components/home/FAQ";
import HowItWorks from "@/components/home/HowItWorks";
import AIAssistant from "@/components/home/AIAssistant";
import { connectDB } from "@/lib/mongoose";
import DestinationModel from "@/models/Destination";
import ReviewModel from "@/models/Review";
import BlogPostModel from "@/models/BlogPost";
import BookingModel from "@/models/Booking";
import UserModel from "@/models/User";

async function getHomeData() {
  try {
    await connectDB();
    const [popular, featured, reviews, posts, destCount, bookingCount, userCount, ratingAgg] = await Promise.all([
      DestinationModel.find({ popular: true }).sort({ rating: -1 }).limit(8).lean(),
      DestinationModel.find({ featured: true }).sort({ rating: -1 }).limit(4).lean(),
      ReviewModel.find({}).sort({ createdAt: -1 }).limit(3).lean(),
      BlogPostModel.find({}).sort({ createdAt: -1 }).limit(3).lean(),
      DestinationModel.countDocuments(),
      BookingModel.countDocuments(),
      UserModel.countDocuments(),
      ReviewModel.aggregate([{ $group: { _id: null, avg: { $avg: "$rating" } } }]),
    ]);
    const avgRating = ratingAgg[0]?.avg ? ratingAgg[0].avg.toFixed(1) : "4.9";
    
    // Serialize data to plain objects
    const serializedReviews = reviews.map((review) => ({
      ...review,
      _id: review._id.toString(),
      destinationId: review.destinationId.toString(),
      createdAt: review.createdAt?.toISOString(),
      updatedAt: review.updatedAt?.toISOString(),
    }));
    
    const serializedPosts = posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt?.toISOString(),
      updatedAt: post.updatedAt?.toISOString(),
    }));
    
    const serializedPopular = popular.map((dest) => ({
      ...dest,
      _id: dest._id.toString(),
      createdAt: dest.createdAt?.toISOString(),
      updatedAt: dest.updatedAt?.toISOString(),
    }));
    
    const serializedFeatured = featured.map((dest) => ({
      ...dest,
      _id: dest._id.toString(),
      createdAt: dest.createdAt?.toISOString(),
      updatedAt: dest.updatedAt?.toISOString(),
    }));
    
    return { 
      popular: serializedPopular, 
      featured: serializedFeatured, 
      reviews: serializedReviews, 
      posts: serializedPosts, 
      destCount, 
      bookingCount, 
      userCount, 
      avgRating 
    };
  } catch {
    return { popular: [], featured: [], reviews: [], posts: [], destCount: 0, bookingCount: 0, userCount: 0, avgRating: "4.9" };
  }
}

export default async function Home() {
  const { popular, featured, reviews, posts, destCount, bookingCount, userCount, avgRating } = await getHomeData();

  return (
    <>
      <Hero />
      <Categories />
      <PopularDestinations destinations={popular} />
      <FeaturedTours destinations={featured} />
      <WhyChooseUs destCount={destCount} />
      <Stats destCount={destCount} bookingCount={bookingCount} userCount={userCount} avgRating={avgRating} />
      <Testimonials reviews={reviews} />
      <Blog posts={posts} />
      <FAQ />
      <HowItWorks />
      <AIAssistant />
    </>
  );
}
