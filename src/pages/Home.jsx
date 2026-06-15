import { FeaturedCategories } from "../components/home/Categories";
import { Hero } from "../components/home/Hero";
import { Newsletter } from "../components/home/Newsletter";
import { TrendingProducts } from "../components/home/Trending";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Header";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedCategories />
      <TrendingProducts />
      <Newsletter />
      <Footer />
    </>
  );
}