import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const InteractiveHoverButton = React.forwardRef(
  ({ text = 'Button', className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'group relative cursor-pointer overflow-hidden rounded-full border p-2 text-center font-semibold',
          'border-[#09090b] bg-[#09090b] text-white',
          'dark:border-white dark:bg-white dark:text-[#09090b]',
          className,
        )}
        {...props}
      >
        {/* Initial text — slides right and fades out on hover */}
        <span className="relative z-10 inline-flex items-center justify-center px-5 py-1.5 transition-all duration-300 group-hover:translate-x-10 group-hover:opacity-0">
          {text}
        </span>

        {/* Hover text + arrow — slides in from right, always white on violet blob */}
        <div className="absolute inset-0 z-20 flex translate-x-10 items-center justify-center gap-2 px-5 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <span>{text}</span>
          <ArrowRight className="h-4 w-4" />
        </div>

        {/* Expanding violet blob */}
        <div className="absolute left-[20%] top-[40%] h-2 w-2 scale-100 rounded-full bg-violet-600 transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:scale-[2] group-hover:rounded-none" />
      </button>
    );
  }
);

InteractiveHoverButton.displayName = 'InteractiveHoverButton';

export { InteractiveHoverButton };
