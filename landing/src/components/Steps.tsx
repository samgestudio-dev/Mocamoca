import { m } from 'framer-motion';
import { EASE_OUT, rise, SOFT, stagger } from '../motion';
import './Steps.css';

/* Numbered steps joined by a line ("How it works"). The line draws down as the steps come into view. */
export function Steps({ items }: { items: { title: string; text: string }[] }) {
  return (
    <m.ol className="lp-steps" variants={stagger(0.15)}>
      {items.map((s, i) => (
        <m.li key={s.title} className="lp-step" variants={rise}>
          {i < items.length - 1 && (
            <m.span
              className="lp-step__line"
              aria-hidden="true"
              variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.2 } } }}
            />
          )}
          <m.span
            className="lp-step__n"
            aria-hidden="true"
            variants={{ hidden: { scale: 0.4, opacity: 0 }, show: { scale: 1, opacity: 1, transition: SOFT } }}
          >
            {i + 1}
          </m.span>
          <div className="lp-step__copy">
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        </m.li>
      ))}
    </m.ol>
  );
}
