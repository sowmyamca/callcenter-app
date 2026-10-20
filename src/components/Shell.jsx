import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import PageHead from './PageHead.jsx';
import { useCall } from './CallContext.jsx';
import { agent } from '../data.js';

const nav = [
  { to: '/', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/plan', label: 'Plan', icon: 'plan' },
  { to: '/calendar', label: 'Calendar', icon: 'calendar' },
  { to: '/pulse', label: 'Pulse', icon: 'pulse' },
];

const planLinks = [
  { to: '/plan/calls', label: 'Calls to make' },
  { to: '/plan/incoming', label: 'Incoming' },
  { to: '/plan/recent', label: 'Recent' },
];

// Pages that get a heading band above their content.
const heads = [
  ['/plan', "Today's calling plan", 'Planner'],
  ['/calendar', 'Your schedule', 'Calendar'],
];

export default function Shell() {
  const { pathname } = useLocation();
  const { startCall } = useCall();
  const inPlan = pathname.startsWith('/plan');
  const head = heads.find(([p]) => pathname.startsWith(p));

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">OG</span>
          <span className="brand-name">On-Ground</span>
        </div>
        <div className="topbar-right">
          <label className="search">
            <Icon name="search" size={15} />
            <input placeholder="Search leads" aria-label="Search leads" />
          </label>
          <button className="icon-btn" aria-label="Notifications">
            <Icon name="bell" size={17} />
            <span className="badge-dot" />
          </button>
          <div className="user">
            <span className="avatar">{agent.initials}</span>
            <span className="user-meta">
              <strong>{agent.name}</strong>
              <small>{agent.role}</small>
            </span>
          </div>
        </div>
      </header>

      <aside className="sidebar">
        <nav className="nav" aria-label="Main">
          {nav.map((n) => (
            <div key={n.to}>
              <NavLink to={n.to} end={n.end} className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
                <Icon name={n.icon} />
                <span>{n.label}</span>
              </NavLink>
              {n.to === '/plan' && inPlan && (
                <div className="nav-sub">
                  {planLinks.map((l) => (
                    <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                      {l.label}
                    </NavLink>
                  ))}
                  <button onClick={() => startCall({ name: 'Practice shopper', phone: '', product: 'Ortho mattress', mode: 'practise' })}>
                    Practice a call
                  </button>
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="sidebar-foot">
          <div className="shift">
            <span className="dot live" /> On shift
          </div>
          <div className="shift-time">{agent.shift}</div>
        </div>
      </aside>

      <main className="content">
        {head && <PageHead eyebrow={head[1]} title={head[2]} />}
        <Outlet />
      </main>
    </div>
  );
}
