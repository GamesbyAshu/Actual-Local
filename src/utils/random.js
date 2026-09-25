// All randomness lives here so the reducer stays pure and rolls can be logged.

export const rollD6 = () => 1 + Math.floor(Math.random() * 6);

export function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const pickOne = (list) => (list.length ? list[Math.floor(Math.random() * list.length)] : null);

export const uid = () => Math.random().toString(36).slice(2, 10);
