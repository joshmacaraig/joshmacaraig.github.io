import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const VerticalCutReveal = ({
  children,
  reverse = false,
  transition = { type: 'spring', stiffness: 190, damping: 22 },
  splitBy = 'words',
  staggerDuration = 0.2,
  staggerFrom = 'first',
  containerClassName,
  wordLevelClassName,
  elementLevelClassName,
  onClick,
  onComplete,
  autoStart = true,
}) => {
  const text = typeof children === 'string' ? children : String(children || '');
  const [isAnimating, setIsAnimating] = useState(false);

  const elements = useMemo(() => {
    if (splitBy === 'words') return text.split(' ');
    if (splitBy === 'lines') return text.split('\n');
    return text.split(splitBy);
  }, [text, splitBy]);

  const getStaggerDelay = useCallback(
    (index) => {
      const total = elements.length;
      if (staggerFrom === 'first') return index * staggerDuration;
      if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration;
      if (staggerFrom === 'center') return Math.abs(Math.floor(total / 2) - index) * staggerDuration;
      return index * staggerDuration;
    },
    [elements.length, staggerFrom, staggerDuration]
  );

  useEffect(() => {
    if (autoStart) setIsAnimating(true);
  }, [autoStart]);

  const variants = {
    hidden: { y: reverse ? '-100%' : '100%' },
    visible: (i) => ({
      y: 0,
      transition: {
        ...transition,
        delay: ((transition?.delay) || 0) + getStaggerDelay(i),
      },
    }),
  };

  return (
    <span
      className={cn(containerClassName, 'flex flex-wrap whitespace-pre-wrap')}
      onClick={onClick}
    >
      <span className="sr-only">{text}</span>
      {elements.map((word, wordIndex) => (
        <span
          key={wordIndex}
          aria-hidden="true"
          className={cn('inline-flex overflow-hidden', wordLevelClassName)}
        >
          <span className={cn(elementLevelClassName, 'whitespace-pre-wrap relative')}>
            <motion.span
              custom={wordIndex}
              initial="hidden"
              animate={isAnimating ? 'visible' : 'hidden'}
              variants={variants}
              onAnimationComplete={wordIndex === elements.length - 1 ? onComplete : undefined}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
          {wordIndex !== elements.length - 1 && <span> </span>}
        </span>
      ))}
    </span>
  );
};

export { VerticalCutReveal };
