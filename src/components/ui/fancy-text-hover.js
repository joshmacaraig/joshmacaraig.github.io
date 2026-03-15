import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { cn } from '../../lib/utils';

const SCATTER_TRANSFORMS = {
  1: { x: '-15%', y: '60%', rotate: 8 },
  2: { x: '-30%', y: '30%', rotate: 4 },
  3: { x: '-20%', y: '40%', rotate: -6 },
  4: { x: '0%', y: '8%', rotate: -8 },
  5: { x: '0%', y: '-20%', rotate: 5 },
  6: { x: '0%', y: '20%', rotate: -3 },
  7: { x: '0%', y: '-40%', rotate: -5 },
  8: { x: '0%', y: '15%', rotate: 10 },
};

export default function FancyTextHover({ links = [], className }) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const fancyEls = containerRef.current.querySelectorAll('.fancy-word');

      fancyEls.forEach((anchor) => {
        const text = anchor.textContent ?? '';
        anchor.textContent = '';

        text.split('').forEach((char, i) => {
          const outer = document.createElement('span');
          outer.className = 'inline-block';

          const inner = document.createElement('span');
          inner.className = 'inline-block';

          const letter = document.createElement('span');
          letter.className = 'inline-block';
          letter.textContent = char;

          inner.appendChild(letter);
          outer.appendChild(inner);
          anchor.appendChild(outer);

          const randomDelay = Math.floor(Math.random() * 5);

          const onEnter = () => {
            const transform = SCATTER_TRANSFORMS[i + 1];
            if (transform) {
              gsap.to(outer, {
                xPercent: parseFloat(transform.x),
                yPercent: parseFloat(transform.y),
                rotation: transform.rotate,
                duration: 0.2,
                ease: 'power3.inOut',
              });
            }
            gsap.to(inner, {
              keyframes: [
                { yPercent: 0, duration: 0 },
                { yPercent: -3, duration: 2.5, ease: 'power3.inOut' },
                { yPercent: 0, duration: 2.5, ease: 'power3.inOut' },
              ],
              repeat: -1,
              delay: randomDelay,
            });
          };

          const onLeave = () => {
            gsap.killTweensOf(inner);
            gsap.to(outer, {
              xPercent: 0,
              yPercent: 0,
              rotation: 0,
              duration: 0.35,
              ease: 'power3.inOut',
            });
            gsap.to(inner, {
              yPercent: 0,
              duration: 0.35,
              ease: 'power3.inOut',
            });
          };

          anchor.addEventListener('mouseenter', onEnter);
          anchor.addEventListener('mouseleave', onLeave);
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={cn('flex w-full flex-col items-start justify-between gap-4', className)}
    >
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="fancy-word text-2xl sm:text-3xl md:text-4xl font-black uppercase no-underline text-white hover:text-sky-400 transition-colors duration-250 ease-[cubic-bezier(0.76,0,0.24,1)] tracking-tight leading-none"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
