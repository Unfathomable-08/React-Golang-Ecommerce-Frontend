import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const footerLinks = {
  shop: [
    { name: 'All Products', path: '/shop' },
    { name: 'Wearables', path: '/shop?category=Wearables' },
    { name: 'VR/AR', path: '/shop?category=VR/AR' },
    { name: 'Audio', path: '/shop?category=Audio' },
  ],
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Careers', path: '#' },
    { name: 'Press', path: '#' },
  ],
  support: [
    { name: 'FAQ', path: '#' },
    { name: 'Shipping', path: '#' },
    { name: 'Returns', path: '#' },
    { name: 'Warranty', path: '#' },
  ],
};

const socialLinks = [
  { icon: FaTwitter, to: '#' },
  { icon: FaInstagram, to: '#' },
  { icon: FaYoutube, to: '#' }
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/50">
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 rounded-lg bg-linear-to-br from-primary to-secondary flex items-center justify-center"
              >
                <Zap className="w-6 h-6 text-primary-foreground" />
              </motion.div>
              <span className="font-display text-2xl font-bold text-gradient">
                NEXUS
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Pioneering the future of human-technology integration. Experience 2040 technology, today.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  to={social.to}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider text-primary mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-wider text-primary mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-wider text-primary mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2040 NEXUS Technologies. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a to="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a to="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}