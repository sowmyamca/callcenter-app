// Small inline icon set so we do not need an icon library.
const paths = {
  dashboard: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z',
  plan: 'M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25c1.1.37 2.3.57 3.6.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1L6.6 10.8z',
  calendar: 'M7 2v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H9V2H7zm-2 8h14v10H5V10z',
  pulse: 'M3 12h4l3-8 4 16 3-8h4',
  chevronLeft: 'M15 18l-6-6 6-6',
  chevronRight: 'M9 18l6-6-6-6',
  chevronDown: 'M6 9l6 6 6-6',
  search: 'M11 4a7 7 0 105 11.9l4.5 4.5 1.4-1.4-4.5-4.5A7 7 0 0011 4z',
  close: 'M6 6l12 12M18 6L6 18',
  send: 'M3 20l18-8L3 4v6l12 2-12 2v6z',
  phone: 'M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25c1.1.37 2.3.57 3.6.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1L6.6 10.8z',
  hash: 'M5 9h14M5 15h14M10 4L8 20M16 4l-2 16',
  bell: 'M12 22a2 2 0 002-2h-4a2 2 0 002 2zm6-6V11a6 6 0 00-5-5.9V4a1 1 0 00-2 0v1.1A6 6 0 006 11v5l-2 2v1h16v-1l-2-2z',
  alert: 'M12 3l10 18H2L12 3zm0 6v5m0 3v.5',
  mic: 'M12 14a3 3 0 003-3V6a3 3 0 00-6 0v5a3 3 0 003 3zm5-3a5 5 0 01-10 0M12 16v4',
  pause: 'M8 5v14M16 5v14',
};

const stroked = new Set(['pulse', 'chevronLeft', 'chevronRight', 'chevronDown', 'close', 'hash', 'alert', 'mic', 'pause']);

export default function Icon({ name, size = 18 }) {
  const isStroke = stroked.has(name);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill={isStroke ? 'none' : 'currentColor'}
      stroke={isStroke ? 'currentColor' : 'none'}
      strokeWidth={isStroke ? 2 : 0}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}
