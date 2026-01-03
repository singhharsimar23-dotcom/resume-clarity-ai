import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import type { ProfessionCategory } from '@/data/profession-templates';
import { professionCategories } from '@/data/profession-templates';

interface ProfessionSelectorProps {
  selected: ProfessionCategory;
  onSelect: (category: ProfessionCategory) => void;
}

export function ProfessionSelector({ selected, onSelect }: ProfessionSelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className="h-4 w-4" /> : null;
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      {showLeftArrow && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-background/80 backdrop-blur-sm shadow-sm"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-2 overflow-x-auto scrollbar-hide py-1 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {professionCategories.map((category) => (
          <Button
            key={category.id}
            variant={selected === category.id ? 'default' : 'outline'}
            size="sm"
            className={`flex-shrink-0 gap-2 transition-all ${
              selected === category.id 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'hover:bg-secondary/80'
            }`}
            onClick={() => onSelect(category.id)}
          >
            {getIcon(category.icon)}
            <span className="whitespace-nowrap">{category.label}</span>
          </Button>
        ))}
      </div>

      {/* Right Arrow */}
      {showRightArrow && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-background/80 backdrop-blur-sm shadow-sm"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
