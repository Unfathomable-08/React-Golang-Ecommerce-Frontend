import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert('Welcome to the future!');
      setEmail('');
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-primary/10 via-transparent to-secondary/10"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at center, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-display uppercase tracking-wider">
              Join the Revolution
            </span>
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Stay Ahead of Time</span>
          </h2>

          <p className="text-muted-foreground text-lg mb-10">
            Be the first to experience groundbreaking releases, exclusive offers,
            and insider access to the future of technology.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 pl-5 pr-5 bg-muted/50 border-primary/50 focus:border-primary rounded-xl font-body"
                />
              </div>
              <button className="h-14 px-8 bg-linear-to-br rounded-2xl from-primary to-secondary">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>

          <p className="mt-4 text-sm text-muted-foreground">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}