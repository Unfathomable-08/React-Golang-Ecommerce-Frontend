"use client";

import { useState, Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Search } from 'lucide-react';
import { Navbar } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ProductCard } from '../components/shop/Card';
import { FiltersSidebar, MobileFiltersSheet } from '../components/shop/Filters';
import { getProducts } from '../lib/actions';
import { useSearchParams } from 'react-router-dom';

const Shop = () => {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]); // State for categories
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 6000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Sync selected category with URL query
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const formatted = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).toLowerCase();
      setSelectedCategory(formatted);
    } else {
      setSelectedCategory('All');
    }
  }, [searchParams]);

  // Fetch Categories on Mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (res.ok) {
          const data = await res.json();
          setCategories([{ name: 'All', count: 0 }, ...data]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Debounce search and Fetch Products
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedCategory, priceRange, searchQuery, page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts({
        page,
        limit: 9,
        category: selectedCategory,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        search: searchQuery
      });
      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setPriceRange([0, 6000]);
    setSearchQuery('');
    setPage(1);
  };

  if (loading && products.length === 0 && page === 1) {
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[150px]" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
              <span className="text-gradient">The Shop</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our collection of timeless elegance
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-12 pr-5 bg-muted/50 border-border/50 focus:border-primary rounded-xl font-body text-base"
            />
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {/* Desktop Filters */}
            <FiltersSidebar
              categories={categories} // Pass categories
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              onClear={handleClearFilters}
            />

            {/* Products Grid */}
            <div className="flex-1">
              {/* Mobile Filter button */}
              <div className="lg:hidden mb-6 flex items-center justify-between">
                <p className="text-muted-foreground">
                  {products.length} products shown
                </p>
                <button
                  variant="outline"
                  onClick={() => setIsMobileFiltersOpen(true)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </button>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-96 bg-muted/20 animate-pulse rounded-xl" />
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product, index) => (
                    <ProductCard
                      key={product.id || product._id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <p className="text-2xl text-muted-foreground mb-4">
                    No products found
                  </p>
                  <button variant="outline" onClick={handleClearFilters}>
                    Clear Filters
                  </button>
                </motion.div>
              )}

              {!loading && products.length > 0 && (
                <div className="mt-12 flex justify-center gap-2">
                  <button
                    variant="outline"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      variant={p === page ? "default" : "outline"}
                      onClick={() => setPage(p)}
                      className="w-10 h-10 p-0"
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    variant="outline"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filters Sheet */}
      <MobileFiltersSheet
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        categories={categories} // Pass categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        onClear={handleClearFilters}
      />

      <Footer />
    </div>
  );
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Shop />
    </Suspense>
  );
}