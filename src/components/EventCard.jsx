import { getEvent } from '../game/events.js';

export default function EventCard({ eventId, round, onClose, closeLabel = 'Continue' }) {
  const ev = getEvent(eventId);
  if (!ev) return null;
  return (
    <div className="overlay" onClick={onClose}>
      <div className="event-card" onClick={(e) => e.stopPropagation()}>
        <div className="event-card__frame">
          <div className="event-card__kicker">Island Event · Round {round}</div>
          <div className="event-card__rule" />
          <div className="event-card__type">{ev.kicker}</div>
          <h2 className="event-card__name">{ev.name}</h2>
          <p className="event-card__text">{ev.text}</p>
          <ul className="event-card__rules">
            {ev.rules.map((r) => <li key={r}>{r}</li>)}
          </ul>
          <div className="event-card__foot">In effect for everyone until the next round.</div>
          <button className="btn btn--primary" onClick={onClose}>{closeLabel}</button>
        </div>
      </div>
    </div>
  );
}
