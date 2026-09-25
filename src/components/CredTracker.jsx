import { CATEGORIES, CATEGORY_IDS } from '../game/constants.js';
import { CATEGORY_ICONS, KeyIcon, KnotIcon } from './Icons.jsx';
import { GAME_CONFIG } from '../config/gameConfig.js';

// Physical equivalent: four peg tracks on the player board.
export function CredTracker({ cred, target = 0, trackLength = 8, compact = false }) {
  return (
    <ul className={`cred ${compact ? 'cred--compact' : ''}`}>
      {CATEGORY_IDS.map((c) => {
        const Icon = CATEGORY_ICONS[c];
        const v = cred[c] || 0;
        const len = Math.max(trackLength, v);
        return (
          <li key={c} className={`cred__row cred__row--${c}`}>
            <span className="cred__icon"><Icon size={compact ? 16 : 20} /></span>
            {!compact && <span className="cred__label">{CATEGORIES[c].label}</span>}
            <span className="cred__track" aria-hidden="true">
              {Array.from({ length: len }).map((_, i) => (
                <span key={i} className={`peg ${i < v ? 'is-filled' : ''} ${target && i === target - 1 ? 'is-target' : ''}`} />
              ))}
            </span>
            <span className="cred__value" key={v}>{v}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function SecretSlots({ count, needed = 1 }) {
  const slots = Math.max(needed, count, 1);
  return (
    <span className="slots" title={`${count} Local Secret${count === 1 ? '' : 's'}`}>
      {Array.from({ length: slots }).map((_, i) => (
        <span key={i} className={`slot slot--secret ${i < count ? 'is-filled' : ''}`}>
          <KeyIcon size={16} />
        </span>
      ))}
    </span>
  );
}

export function KnowHowSlots({ count }) {
  return (
    <span className="slots" title={`${count} Island Know-How`}>
      {Array.from({ length: GAME_CONFIG.knowHow.max }).map((_, i) => (
        <span key={i} className={`slot slot--knowhow ${i < count ? 'is-filled' : ''}`}>
          <KnotIcon size={16} />
        </span>
      ))}
    </span>
  );
}
