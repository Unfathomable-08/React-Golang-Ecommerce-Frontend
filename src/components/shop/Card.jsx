import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export function ProductCard({ product, index = 0 }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // createCart("123", product.id) // Removed redundant call
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.url,
    });
    alert("Added to cart");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Link to={`/shop/${product.id}`} className="group block">
        <motion.div
          whileHover={{ y: -8 }}
          className="glass-card overflow-hidden relative"
        >
          {/* Hover Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-linear-to-t from-primary/20 via-transparent to-transparent" />
          </div>

          {/* Image */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {product.new && (
                <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-display uppercase shadow-[0_0_10px_hsl(var(--primary))]">
                  New
                </span>
              )}
              {product.originalPrice && (
                <span className="px-3 py-1 rounded-full bg-destructive text-destructive-foreground text-xs font-display uppercase">
                  Sale
                </span>
              )}
            </div>

            {/* Quick Add */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <button
                className="w-full"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm text-foreground">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviews.toLocaleString()})
              </span>
            </div>

            <h3 className="font-display text-lg font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {product.description}
            </p>

            <div className="flex items-center gap-3">
              <span className="font-display text-xl text-primary">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-muted-foreground line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}