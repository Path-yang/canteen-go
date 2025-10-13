import React, { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // milliseconds between letters
  duration?: number; // seconds for each letter
  ease?: string | ((t: number) => number);
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if ((document as any).fonts?.status === 'loaded') {
      setFontsLoaded(true);
    } else if ((document as any).fonts?.ready) {
      (document as any).fonts.ready.then(() => setFontsLoaded(true));
    } else {
      // Fallback if Font Loading API unsupported
      setFontsLoaded(true);
    }
  }, []);

  // Pre-split the text into characters preserving spaces
  const chars = useMemo(() => {
    // Replace spaces with non-breaking spaces so spans keep width
    return text.split('').map((ch) => (ch === ' ' ? '\u00A0' : ch));
  }, [text]);

  useGSAP(
    () => {
      if (!ref.current || !fontsLoaded) return;
      const parent = ref.current;
      const items = Array.from(parent.querySelectorAll<HTMLElement>('.split-char'));
      if (!items.length) return;

      // Clear previous transforms
      gsap.set(items, { clearProps: 'all' });

      gsap.fromTo(
        items,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: (delay || 0) / 1000,
          onComplete: () => onLetterAnimationComplete?.(),
          willChange: 'transform, opacity',
          force3D: true,
        }
      );
    },
    { dependencies: [text, delay, duration, ease, JSON.stringify(from), JSON.stringify(to), fontsLoaded] }
  );

  const commonStyle: React.CSSProperties = {
    textAlign,
    display: 'inline-block',
    whiteSpace: 'normal',
  };

  const ContainerTag = tag as any;

  return (
    <ContainerTag ref={ref as any} className={`split-parent ${className}`} style={commonStyle}>
      {chars.map((c, i) => (
        <span
          key={i}
          className="split-char inline-block will-change-transform"
          style={{ display: 'inline-block' }}
        >
          {c}
        </span>
      ))}
    </ContainerTag>
  );
};

export default SplitText;

