import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shirt,     // Tops & Dresses
  Sparkles,  // Skirts (elegant flair)
} from 'lucide-react';
import { GiShoppingBag } from "react-icons/gi";
import { GiPirateCoat } from "react-icons/gi";
import { PiPantsFill } from "react-icons/pi";
import { GiRunningShoe } from "react-icons/gi";

const categories = [
  { name: 'Tops',         icon: Shirt,     color: 'from-secondary to-amber-300' },     // Gold with lighter highlight
  { name: 'Bottoms',      icon: PiPantsFill,     color: 'from-primary to-yellow-600' },
  { name: 'Skirts',       icon: Sparkles,  color: 'from-secondary to-orange-400' },
  { name: 'Outerwear',    icon: GiPirateCoat,      color: 'from-primary to-amber-500' },
  { name: 'Shoes',        icon: GiRunningShoe,      color: 'from-secondary to-yellow-500' },
  { name: 'Bags',         icon: GiShoppingBag,   color: 'from-primary to-orange-500' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function FeaturedCategories() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Glow – soft warm metallic */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 md:w-150 md:h-150 bg-secondary/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Explore Collections</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Timeless elegance crafted with precision and passion
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.name} variants={itemVariants}>
              <Link
                to={`/shop?category=${category.name.toLowerCase()}`}
                className="group block"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="glass-card px-3 py-6 md:py-8 text-center relative overflow-hidden transition-all duration-300"
                >
                  {/* Subtle hover overlay */}
                  <div className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  
                  {/* Icon with metallic gradient */}
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto mb-5 rounded-2xl bg-linear-to-br ${category.color} p-4 flex items-center justify-center shadow-lg`}
                  >
                    <category.icon className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={1.5} />
                  </motion.div>

                  {/* Category Name */}
                  <h3 className="font-display text-base md:text-lg uppercase tracking-wide text-foreground group-hover:text-primary transition-colors duration-300">
                    {category.name}
                  </h3>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}