import { useState } from 'react';
import { m, useMotionValueEvent, useScroll } from 'framer-motion';
import { LogoLockup } from './Logo';
import { Button } from './Button';
import './TopBar.css';

/* Header (Figma 2549:15098, "Brand"): logo lockup on the hero art. Fixed; a brand-green fill fades in once the page scrolls
   past the header art, so the white logo always reads. */
export function TopBar({ cta, onCta }: { cta: { href: string; label: string }; onCta?: () => void }) {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setSolid(v > 120));
  return (
    <header className="lp-topbar">
      <m.div className="lp-topbar__fill" initial={false} animate={{ opacity: solid ? 1 : 0 }} transition={{ duration: 0.25 }} />
      <a href="#top" className="lp-topbar__brand" aria-label="MocaMoca home">
        <LogoLockup />
      </a>
      <Button href={cta.href} tone="light" size="sm" external onClick={onCta}>
        {cta.label}
      </Button>
    </header>
  );
}
