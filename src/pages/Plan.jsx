import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import Pager from '../components/Pager.jsx';
import { useCall } from '../components/CallContext.jsx';
import { incoming, inr, leads, recent } from '../data.js';

export default function Plan() {
  return (
    <div className="stack">
      <div className="tabs" role="tablist">
        <NavLink to="/plan/calls" className={({ isActive }) => 'tab' + (isActive ? ' active' : '')}>Calls to make</NavLink>
        <NavLink to="/plan/incoming" className={({ isActive }) => 'tab' + (isActive ? ' active' : '')}>
          Incoming <span className="count">{incoming.length}</span>
        </NavLink>
        <NavLink to="/plan/recent" className={({ isActive }) => 'tab' + (isActive ? ' active' : '')}>Recent</NavLink>
      </div>
      <Outlet />
    </div>
  );
}

/* ---------- Calls to make: sorted by score, expandable rows, paging ---------- */

const PAGE = 6;

export function CallsToMake() {
  const [page, setPage] = useState(0);
  const [openId, setOpenId] = useState(null);
  const { startCall } = useCall();
  const rows = leads.slice(page * PAGE, page * PAGE + PAGE);

  return (
    <div className="card flush">
      <div className="card-head pad">
        <h2>Calls to make</h2>
        <span className="muted small">Sorted by lead score</span>
      </div>
      <ul className="rows">
        {rows.map((l) => {
          const open = openId === l.id;
          return (
            <li key={l.id} className={'row' + (open ? ' open' : '')}>
              <button className="row-main" onClick={() => setOpenId(open ? null : l.id)} aria-expanded={open}>
                <span className={'score-pill s' + (l.score >= 80 ? 'hi' : l.score >= 60 ? 'mid' : 'lo')}>{l.score}</span>
                <span className="grow left">
                  <strong>{l.name}</strong>
                  <span className="muted small block">{l.product} · {l.city}</span>
                </span>
                <span className="muted small hide-sm">{l.stage}</span>
                <span className="small due">Due {l.due}</span>
                <span className={'chev' + (open ? ' open' : '')}><Icon name="chevronDown" size={16} /></span>
              </button>
              {open && (
                <div className="row-detail">
                  <div className="detail-grid">
                    <div><div className="label">Phone</div>{l.phone}</div>
                    <div><div className="label">Deal value</div>{inr(l.value)}</div>
                    <div><div className="label">Source</div>{l.source}</div>
                    <div><div className="label">Last contact</div>{l.lastContact}</div>
                  </div>
                  <p className="note">{l.note}</p>
                  <div className="row-actions">
                    <button className="btn" onClick={() => startCall({ name: l.name, phone: l.phone, product: l.product, mode: 'practise' })}>Practise a call</button>
                    <button className="btn primary" onClick={() => startCall({ name: l.name, phone: l.phone, product: l.product })}>
                      <Icon name="phone" size={15} /> Call {l.name.split(' ')[0]}
                    </button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <Pager page={page} pageSize={PAGE} total={leads.length} onPage={(p) => { setPage(p); setOpenId(null); }} />
    </div>
  );
}

/* ---------- Incoming: missed calls, with value at stake and a callback in every row ---------- */

export function Incoming() {
  const { startCall } = useCall();
  const total = incoming.reduce((s, m) => s + m.value, 0);
  return (
    <div className="card flush">
      <div className="card-head pad">
        <h2>Missed calls</h2>
        <span className="muted small">{inr(total)} at stake</span>
      </div>
      <ul className="rows">
        {incoming.map((m) => (
          <li key={m.id} className="row">
            <div className="row-main static">
              <span className="avatar">{m.name.split(' ').map((p) => p[0]).join('')}</span>
              <span className="grow left">
                <strong>{m.name}</strong>
                <span className="muted small block">{m.phone} · {m.product}</span>
              </span>
              <span className="right-col hide-sm">
                <strong className="small">{inr(m.value)}</strong>
                <span className="muted small">{m.attempts} attempt{m.attempts > 1 ? 's' : ''}</span>
              </span>
              <span className="right-col">
                <span className="small">{m.at}</span>
                <span className="muted small">{m.ago}</span>
              </span>
              <button className="btn small primary" onClick={() => startCall({ name: m.name, phone: m.phone, product: m.product })}>
                <Icon name="phone" size={14} /> Call back
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Recent: calls by type, time and length. Tap a call to review it. ---------- */

const outcomeTone = { 'Visit booked': 'green', 'Quote sent': 'blue', Negotiating: 'amber', 'Not interested': 'red', 'No answer': 'grey', 'Call back later': 'grey' };

export function Recent() {
  const [openId, setOpenId] = useState(null);
  const [filter, setFilter] = useState('All');
  const rows = recent.filter((r) => filter === 'All' || r.type === filter);
  return (
    <div className="card flush">
      <div className="card-head pad">
        <h2>Recent calls</h2>
        <div className="chips">
          {['All', 'Outbound', 'Inbound'].map((f) => (
            <button key={f} className={'chip' + (filter === f ? ' active' : '')} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>
      <ul className="rows">
        {rows.map((r) => {
          const open = openId === r.id;
          return (
            <li key={r.id} className={'row' + (open ? ' open' : '')}>
              <button className="row-main" onClick={() => setOpenId(open ? null : r.id)} aria-expanded={open}>
                <span className={'type-tag ' + r.type.toLowerCase()}>{r.type === 'Outbound' ? 'Out' : 'In'}</span>
                <span className="grow left">
                  <strong>{r.name}</strong>
                  <span className="muted small block">{r.at} · {r.duration}</span>
                </span>
                <span className={'pill ' + (outcomeTone[r.outcome] || 'grey')}>{r.outcome}</span>
                <span className={'chev' + (open ? ' open' : '')}><Icon name="chevronDown" size={16} /></span>
              </button>
              {open && (
                <div className="row-detail">
                  <div className="label">Call review · {r.sentiment} tone</div>
                  <p className="note">{r.summary}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
