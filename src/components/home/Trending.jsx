import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { Star, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getTrendingProducts } from '../../lib/actions';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

export function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTrendingProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch trending products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) return null; // Or a skeleton loader
  if (products.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-150 h-150 bg-secondary/30 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-150 h-150 bg-primary/30 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Trending Now</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The most sought-after technology of tomorrow, available today
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={products.length > 2} // Only loop if enough items
          className="overflow-visible!"
        >
          {products.map((product) => (
            <SwiperSlide
              key={product._id}
              className="w-65! sm:w-70! md:w-90! py-8"
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="glass-card overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-52 md:h-64 overflow-hidden">
                  <img
                    src={product.images?.[0]?.url || product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {product.new && (
                      <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-display uppercase">
                        New
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="px-3 py-1 rounded-full bg-destructive text-destructive-foreground text-xs font-display uppercase">
                        Sale
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-sm text-foreground">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({(product.reviews || 0).toLocaleString()})
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-semibold mb-2 line-clamp-1">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-display text-2xl text-primary">
                      ${product.price?.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-muted-foreground line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <Link to={`/shop/${product._id}`}>
                    <button className="w-full group/btn">
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/shop">
            <button size="lg">
              View All Products
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}