// Catmull-Rom → cubic Bézier, for smooth coastlines from a handful of points.
export function smoothClosedPath(points, tension = 0.5) {
  const n = points.length;
  if (n < 3) return '';
  const p = (i) => points[(i + n) % n];
  let d = `M ${p(0)[0]} ${p(0)[1]}`;
  for (let i = 0; i < n; i++) {
    const [x0, y0] = p(i - 1);
    const [x1, y1] = p(i);
    const [x2, y2] = p(i + 1);
    const [x3, y3] = p(i + 2);
    const c1x = x1 + ((x2 - x0) * tension) / 3;
    const c1y = y1 + ((y2 - y0) * tension) / 3;
    const c2x = x2 - ((x3 - x1) * tension) / 3;
    const c2y = y2 - ((y3 - y1) * tension) / 3;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${x2} ${y2}`;
  }
  return d + ' Z';
}

// Gentle curve between two route nodes; `bend` offsets the control point sideways.
export function routeCurve(a, b, bend = 0.08) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const cx = mx - dy * bend;
  const cy = my + dx * bend;
  return `M ${a.x} ${a.y} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x} ${b.y}`;
}
