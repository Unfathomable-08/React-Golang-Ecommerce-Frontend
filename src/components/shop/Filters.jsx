import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "../../lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}) {
  const _values = React.useMemo(() =>
    Array.isArray(value)
      ? value
      : Array.isArray(defaultValue)
        ? defaultValue
        : [min, max], [value, defaultValue, min, max])

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}>
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        )}>
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          )} />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50" />
      ))}
    </SliderPrimitive.Root>
  );
}

export function FiltersSidebar({
  categories = [],
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  onClear,
}) {
  return (
    <aside className="hidden lg:block w-72 shrink-0 sticky top-18 self-start">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg uppercase tracking-wider text-foreground">
            Filters
          </h3>
          <button onClick={onClear}>
            Clear
          </button>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h4 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-4">
            Category
          </h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-300 ${selectedCategory === category.name
                    ? 'bg-primary/20 text-primary border border-primary/50'
                    : 'bg-muted/50 text-foreground hover:bg-muted border border-transparent'
                  }`}
              >
                <span className="text-sm">{category.name}</span>
                <span className="text-xs text-muted-foreground">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-4">
            Price Range
          </h4>
          <Slider
            min={0}
            max={6000}
            step={100}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value)}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function MobileFiltersSheet({
  isOpen,
  onClose,
  categories = [],
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  onClear,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-0 left-0 right-0 h-[70vh] glass-card rounded-t-3xl z-50 p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl uppercase tracking-wider text-foreground">
                Filters
              </h3>
              <button onClick={onClose}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h4 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-4">
                Category
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ${selectedCategory === category.name
                        ? 'bg-primary/20 text-primary border border-primary/50'
                        : 'bg-muted/50 text-foreground border border-transparent'
                      }`}
                  >
                    <span className="text-sm">{category.name}</span>
                    {selectedCategory === category.name && (
                      <Check className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h4 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-4">
                Price Range
              </h4>
              <Slider
                min={0}
                max={6000}
                step={100}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value)}
                className="mb-4"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button className="flex-1" onClick={onClear}>
                Clear All
              </button>
              <button className="flex-1" onClick={onClose}>
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}