import type { ReactNode } from 'react';
import { m } from 'framer-motion';
import { press } from '../motion';
import './Button.css';

/* Button (Figma 2550:15309) as a link: every action on this page leaves for the app or jumps to a section.
   tone: primary (brand fill, Shadow/Brand) | light (white on brand surfaces) · size: lg 48 | sm 36 · block: full width */
type Props = {
  href: string;
  children: ReactNode;
  tone?: 'primary' | 'light';
  size?: 'lg' | 'sm';
  block?: boolean;
  external?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
};

export function Button({ href, children, tone = 'primary', size = 'lg', block, external = /^https?:/.test(href), icon, onClick }: Props) {
  return (
    <m.a
      href={href}
      className={`lp-btn lp-btn--${tone} lp-btn--${size}${block ? ' lp-btn--block' : ''}`}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      {...press}
    >
      {icon}
      <span>{children}</span>
    </m.a>
  );
}

/** Google Play mark (Simple Icons "googleplay", CC0) — takes the label colour */
export function PlayMark({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        fill="currentColor"
        d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z"
      />
    </svg>
  );
}
