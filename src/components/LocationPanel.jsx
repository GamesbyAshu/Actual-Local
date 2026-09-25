import { useState } from 'react';
import { GAME_CONFIG } from '../config/gameConfig.js';
import { CATEGORIES, DECKS, DIFFICULTY_IDS } from '../game/constants.js';
import { CATEGORY_ICONS, CloseIcon, KeyIcon, LighthouseIcon, MODE_ICONS, WaveIcon, SailboatIcon, RoseIcon } from './Icons.jsx';

// Illustrated placeholder shown until a licensed photograph is supplied.
function Photo({ location }) {
  const { image } = location;
  if (image?.src) {
    return (
      <figure className="photo">
        <img src={image.src} alt={image.alt} />
        <figcaption>{image.credit} · {image.license}</figcaption>
      </figure>
    );
  }
  const Motif = { lighthouse: LighthouseIcon, beach: WaveIcon, hub: SailboatIcon, village: RoseIcon }[location.type] || WaveIcon;
  return (
    <figure className={`photo photo--placeholder photo--${location.type}`}>
      <svg className="photo__scene" viewBox="0 0 400 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="180" className="scene-sky" />
        <circle cx="318" cy="58" r="22" className="scene-sun" />
        <path d="M0 118 Q 100 104 200 116 T 400 112 V180 H0Z" className="scene-sea" />
        <path d="M0 140 Q 120 128 240 142 T 400 136 V180 H0Z" className="scene-sand" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${20 + i * 80} ${128 + (i % 2) * 4} q 10 -4 20 0 t 20 0`} className="scene-wave" />
        ))}
      </svg>
      <div className="photo__motif"><Motif size={54} strokeWidth={1.1} /></div>
      <figcaption>
        <strong>Photograph placeholder</strong> — {image?.alt}. Suggested licensed source: {image?.suggestedSource}.
      </figcaption>
    </figure>
  );
}

export function TravelBox({ preview, onConfirm, onCancel }) {
  const Icon = MODE_ICONS[preview.mode.id];
  return (
    <div className="travel-box">
      <div className="travel-box__row">
        <Icon size={22} />
        <div>
          <div className="travel-box__title">
            {preview.mode.label} to {preview.destName}
          </div>
          <div className="travel-box__meta">
            {preview.line ? `${preview.line} · ` : ''}{preview.steps} space{preview.steps > 1 ? 's' : ''} · Cost: {preview.cost}
          </div>
        </div>
      </div>
      <ul className="travel-box__cons">
        {preview.consequences.map((c) => <li key={c}>{c}</li>)}
      </ul>
      <div className="btn-row">
        <button className="btn btn--primary" onClick={onConfirm}>{preview.needsRoll ? 'Roll & travel' : 'Travel'}</button>
        <button className="btn btn--ghost" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

function ExperienceChooser({ experiences, secret, onChoose, onSecret, onSkip }) {
  const [cat, setCat] = useState(null);
  const chosen = experiences.find((e) => e.category === cat);
  return (
    <div className="experiences">
      <div className="section-title">Choose an experience</div>
      <div className="exp-grid">
        {experiences.map((e) => {
          const Icon = CATEGORY_ICONS[e.category];
          return (
            <button key={e.category} className={`exp ${cat === e.category ? 'is-selected' : ''}`} onClick={() => setCat(e.category)}>
              <Icon size={22} />
              <span className="exp__name">{CATEGORIES[e.category].label}</span>
              <span className="exp__decks">{e.decks.map((d) => DECKS[d].label).join(' · ')} · {e.total} left</span>
            </button>
          );
        })}
        {!experiences.length && <p className="hint">You’ve done every experience here. Try somewhere new.</p>}
      </div>

      {chosen && (
        <div className="difficulty">
          <div className="section-title">How local are you feeling?</div>
          <div className="diff-row">
            {DIFFICULTY_IDS.map((d) => {
              const cfg = GAME_CONFIG.difficulty[d];
              const n = chosen.counts[d];
              return (
                <button key={d} className={`diff diff--${d}`} disabled={!n} onClick={() => onChoose(chosen.category, d)}>
                  <span className="diff__name">{cfg.label}</span>
                  <span className="diff__reward">+{cfg.reward}</span>
                  <span className="diff__risk">
                    {cfg.penalty ? `−${cfg.penalty} if wrong` : 'no risk'}
                    {cfg.knowHow ? ` · +${cfg.knowHow} Know-How` : ''}
                  </span>
                  <span className="diff__left">{n ? `${n} card${n > 1 ? 's' : ''}` : 'none left'}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {secret && (
        <div className={`secret-offer ${secret.available ? '' : 'is-locked'}`}>
          <KeyIcon size={26} />
          <div>
            <div className="secret-offer__title">Local Secret: {secret.secret.name}</div>
            <div className="secret-offer__text">
              {secret.available
                ? `A hard, one-shot question. Win the Secret token, +${secret.secret.reward.amount} ${CATEGORIES[secret.secret.reward.category].label} and +${secret.secret.reward.knowHow} Know-How. No penalty if you miss; you may try again on a later visit.`
                : secret.reason}
            </div>
          </div>
          {secret.available && <button className="btn btn--secret" onClick={onSecret}>Attempt</button>}
        </div>
      )}

      <button className="btn btn--ghost btn--small" onClick={onSkip}>Pass. Just enjoying the view.</button>
    </div>
  );
}

export default function LocationPanel({ location, variant, preview, experiences, secret, onClose, onConfirmTravel, onCancelTravel, onChoose, onSecret, onSkip }) {
  return (
    <div className={`location-panel location-panel--${variant}`} key={location.id + variant}>
      {variant !== 'arrival' && (
        <button className="icon-btn location-panel__close" onClick={onClose} aria-label="Close">
          <CloseIcon size={18} />
        </button>
      )}
      <Photo location={location} />
      <div className="location-panel__body">
        <div className="location-panel__type">{variant === 'arrival' ? 'You have arrived at' : location.type === 'hub' ? 'Island hub' : location.type}</div>
        <h2 className="location-panel__name">{location.name}</h2>
        <p className="location-panel__desc">{location.description}</p>

        {variant === 'travel' && preview && <TravelBox preview={preview} onConfirm={onConfirmTravel} onCancel={onCancelTravel} />}

        {variant === 'arrival' && (
          <ExperienceChooser experiences={experiences} secret={secret} onChoose={onChoose} onSecret={onSecret} onSkip={onSkip} />
        )}

        {variant !== 'arrival' && (
          <div className="possible">
            <div className="section-title">Possible experiences</div>
            <div className="possible__chips">
              {experiences.map((e) => {
                const Icon = CATEGORY_ICONS[e.category];
                return <span key={e.category} className="chip"><Icon size={14} /> {CATEGORIES[e.category].label}</span>;
              })}
              {location.secret && <span className="chip chip--secret"><KeyIcon size={14} /> Local Secret</span>}
            </div>
          </div>
        )}

        {location.specialAbility && (
          <div className="ability">
            <div className="ability__label">{location.specialAbility.label}</div>
            <div className="ability__text">{location.specialAbility.text}</div>
          </div>
        )}

        <details className="history-note">
          <summary>History</summary>
          <p>{location.history}</p>
        </details>
      </div>
    </div>
  );
}
