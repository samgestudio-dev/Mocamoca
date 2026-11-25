import markSrc from '../assets/logo-mark.png';
import wordmarkSrc from '../assets/logo-wordmark-white.svg';

/* Logo/Lockup (Figma 2547:15057): mark + white wordmark. Brand artwork, used as-is. */
export function LogoLockup({ size = 36 }: { size?: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-gap-xs)' }}>
      <img src={markSrc} width={size} height={size} alt="" />
      <img src={wordmarkSrc} width={108} height={16} alt="MocaMoca" />
    </span>
  );
}
