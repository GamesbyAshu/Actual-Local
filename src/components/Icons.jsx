// Engraved-style line icons. All draw in currentColor on a 24 x 24 grid.

const Svg = ({ size = 20, children, strokeWidth = 1.4, title, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    role={title ? 'img' : 'presentation'}
    aria-label={title}
    {...rest}
  >
    {children}
  </svg>
);

export const WhaleIcon = (p) => (
  <Svg {...p}>
    <path d="M2.5 12.5c1.8-3 5.6-4.3 9.6-4.3 3.6 0 6.3 1.6 7.4 3.6.5-1.6 1.6-2.8 2.9-3.3-.4 1.9-.1 3.6.9 5.1-1.3-.4-2.5-.1-3.4.8-1.4 2.2-4.4 3.3-8.1 3.3-4.6 0-8.2-1.9-9.3-5.2z" />
    <path d="M5 14.8c2.2 1 5.6 1.3 8.5.6" />
    <circle cx="6.4" cy="11.6" r=".45" fill="currentColor" />
  </Svg>
);

export const CompassIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="6.6" strokeDasharray="1 2" />
    <path d="M12 4.6 14 12l-2 7.4L10 12z" />
    <path d="M12 4.6 14 12h-4z" fill="currentColor" />
  </Svg>
);

export const WaveIcon = (p) => (
  <Svg {...p}>
    <path d="M2.5 10c2 0 2.4-2.2 4.7-2.2S10 10 12 10s2.5-2.2 4.8-2.2S19.5 10 21.5 10" />
    <path d="M2.5 14.5c2 0 2.4-2.2 4.7-2.2s2.8 2.2 4.8 2.2 2.5-2.2 4.8-2.2 2.7 2.2 4.7 2.2" />
    <path d="M4.5 18.5c1.6 0 2-1.6 3.8-1.6s2.2 1.6 3.7 1.6 2-1.6 3.8-1.6 2.2 1.6 3.7 1.6" />
  </Svg>
);

export const AnchorIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="4.8" r="1.8" />
    <path d="M12 6.6v14" />
    <path d="M8.2 9.6h7.6" />
    <path d="M4 13.5c.4 4 3.8 7.1 8 7.1s7.6-3.1 8-7.1" />
    <path d="M2.8 14.8 4 13.4l1.6 1" />
    <path d="M21.2 14.8 20 13.4l-1.6 1" />
  </Svg>
);

export const KeyIcon = (p) => (
  <Svg {...p}>
    <circle cx="7.5" cy="12" r="4" />
    <circle cx="7.5" cy="12" r="1.4" />
    <path d="M11.5 12H21" />
    <path d="M17.5 12v3M20 12v2.2" />
  </Svg>
);

export const KnotIcon = (p) => (
  <Svg {...p}>
    <path d="M4 17c3 0 4-2 5.2-4.4C10.6 9.8 11.8 6 15 6a3.6 3.6 0 0 1 0 7.2c-2.2 0-3.4-1.6-4.6-3.4" />
    <path d="M9.2 13.4C8 11.6 6.8 10 4.6 10A3.1 3.1 0 0 0 4.6 16.2" />
    <path d="M14.8 13.2c1.4 2.4 2.6 4.8 5.2 4.8" />
  </Svg>
);

export const WalkIcon = (p) => (
  <Svg {...p}>
    <path d="M8 3.5c1.6 0 2.4 1.8 2.2 4.1-.2 2.1-1 3.4-2.3 3.4S5.7 9.8 5.8 7.4C5.9 5.3 6.6 3.5 8 3.5z" />
    <path d="M6.6 12.6h2.6l-.3 2.2c-.2 1-.9 1.5-1.6 1.3-.8-.2-1-.9-.9-1.8z" />
    <path d="M16 8.5c1.4 0 2.2 1.8 2.2 4.1 0 2.1-.8 3.4-2.1 3.4s-2.2-1.2-2.1-3.6c.1-2.1.8-3.9 2-3.9z" />
    <path d="M14.6 17.6h2.6l-.3 2.2c-.2 1-.9 1.5-1.6 1.3-.8-.2-1-.9-.9-1.8z" />
  </Svg>
);

export const BikeIcon = (p) => (
  <Svg {...p}>
    <circle cx="5.5" cy="16" r="3.6" />
    <circle cx="18.5" cy="16" r="3.6" />
    <path d="M5.5 16 9.5 9h6.5l2.5 7" />
    <path d="M9.5 9 12.5 16h-7" />
    <path d="M12.5 16 16 9" />
    <path d="M8.2 6.5h3" />
    <path d="M15.2 6.2h2.2l-1.4 2.8" />
  </Svg>
);

export const ShuttleIcon = (p) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="12" rx="2.4" />
    <path d="M3.5 11h17" />
    <path d="M8 5v6M12 5v6M16 5v6" />
    <circle cx="7.5" cy="18.4" r="1.6" />
    <circle cx="16.5" cy="18.4" r="1.6" />
  </Svg>
);

export const LighthouseIcon = (p) => (
  <Svg {...p}>
    <path d="M9.6 8.5h4.8l1.4 12.5H8.2z" />
    <path d="M9 8.5h6" />
    <path d="M10 4.5h4v4h-4z" />
    <path d="M12 2.2v2.3" />
    <path d="M9 14h6.2" />
    <path d="M6 5.5 3.5 4.5M18 5.5l2.5-1M6 7.5l-2.5.5M18 7.5l2.5.5" />
  </Svg>
);

export const BasketIcon = (p) => (
  <Svg {...p}>
    <path d="M4 11h16l-1.6 7.2a2.4 2.4 0 0 1-2.4 1.8H8a2.4 2.4 0 0 1-2.4-1.8z" />
    <path d="M5 11c0-4.2 3.1-7 7-7s7 2.8 7 7" />
    <path d="M9 11v9M12 11v9M15 11v9" />
    <path d="M4.8 14.5h14.4M5.5 17.5h13" />
  </Svg>
);

export const ScallopIcon = (p) => (
  <Svg {...p}>
    <path d="M12 19.5 3.6 9.4C5 6 8.2 4 12 4s7 2 8.4 5.4z" />
    <path d="M12 19.5 7.2 5.4M12 19.5 9.6 4.3M12 19.5V4M12 19.5l2.4-15.2M12 19.5l4.8-14.1" />
    <path d="M10 19.5h4l-.6 1.6h-2.8z" />
  </Svg>
);

export const SailboatIcon = (p) => (
  <Svg {...p}>
    <path d="M11 3v13" />
    <path d="M11 3.5 18.5 15H11z" />
    <path d="M11 6 6 15h5" />
    <path d="M3.5 17.5h17l-2.3 3H5.8z" />
  </Svg>
);

export const RoseIcon = (p) => (
  <Svg {...p}>
    <path d="M12 12.5c-1.6 0-2.4-1.2-2.1-2.4.3-1.2 1.8-1.7 2.8-.9 1 .8.6 2.3-.5 2.4" />
    <path d="M12 15.5a4.8 4.8 0 1 0-4.6-6.2" />
    <path d="M12 15.5a4.8 4.8 0 0 0 4.7-5.8" />
    <path d="M12 15.5V21" />
    <path d="M12 18.5c-1.8 0-3.2-.8-4-2.2 1.9-.2 3.2.5 4 2.2z" />
  </Svg>
);

export const CloseIcon = (p) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const MODE_ICONS = { walk: WalkIcon, bike: BikeIcon, shuttle: ShuttleIcon };

export const CATEGORY_ICONS = {
  history: WhaleIcon,
  knowledge: CompassIcon,
  life: WaveIcon,
  community: AnchorIcon,
};

export const TOKEN_ICONS = {
  lighthouse: LighthouseIcon,
  basket: BasketIcon,
  scallop: ScallopIcon,
  sailboat: SailboatIcon,
  whale: WhaleIcon,
  rose: RoseIcon,
};

// A die face, drawn like a bone die.
export function Die({ value, size = 44, tone = 'neutral' }) {
  const pips = {
    1: [[12, 12]],
    2: [[7, 7], [17, 17]],
    3: [[7, 7], [12, 12], [17, 17]],
    4: [[7, 7], [17, 7], [7, 17], [17, 17]],
    5: [[7, 7], [17, 7], [12, 12], [7, 17], [17, 17]],
    6: [[7, 6.5], [17, 6.5], [7, 12], [17, 12], [7, 17.5], [17, 17.5]],
  }[value] || [];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`die die--${tone}`}>
      <rect x="1.5" y="1.5" width="21" height="21" rx="4" />
      {pips.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.9" />)}
    </svg>
  );
}
