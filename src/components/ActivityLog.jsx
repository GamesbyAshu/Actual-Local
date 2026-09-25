export default function ActivityLog({ log, players }) {
  const name = (id) => players.find((p) => p.id === id)?.name;
  return (
    <footer className="log">
      <div className="log__title">Ship’s Log</div>
      <ol className="log__list">
        {log.slice(0, 40).map((e) => (
          <li key={e.id} className={`log__item log__item--${e.tone}`}>
            <span className="log__round">R{e.round}</span>
            <span>{e.text}</span>
            {e.playerId && <span className="sr-only">{name(e.playerId)}</span>}
          </li>
        ))}
      </ol>
    </footer>
  );
}
