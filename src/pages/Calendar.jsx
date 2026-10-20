import { useMemo, useState } from 'react';
import Icon from '../components/Icon.jsx';
import { calendarEvents, formatTime } from '../data.js';

const kinds = {
  call: { label: 'Calls', color: 'var(--green-500)' },
  visit: { label: 'Store visits', color: 'var(--amber)' },
  meeting: { label: 'Meetings', color: 'var(--purple)' },
  training: { label: 'Training', color: '#3b82c4' },
};

const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Calendar() {
  const now = new Date();
  const [cursor, setCursor] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  const [selected, setSelected] = useState(now);

  const cells = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const lead = (first.getDay() + 6) % 7; // Monday first
    const days = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    const out = [];
    for (let i = 0; i < lead; i++) out.push(null);
    for (let d = 1; d <= days; d++) out.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
    while (out.length % 7) out.push(null);
    return out;
  }, [cursor]);

  const eventsOn = (d) => calendarEvents.filter((e) => sameDay(e.start, d)).sort((a, b) => a.start - b.start);
  const monthEvents = calendarEvents.filter((e) => e.start.getMonth() === cursor.getMonth() && e.start.getFullYear() === cursor.getFullYear());
  const dayEvents = eventsOn(selected);
  const isToday = sameDay(selected, now);

  const shift = (n) => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + n, 1));

  return (
    <div className="cal-layout">
      <div className="card">
        <div className="card-head">
          <h2>{cursor.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</h2>
          <div className="pager-btns">
            <button className="btn small" onClick={() => shift(-1)} aria-label="Previous month"><Icon name="chevronLeft" size={14} /></button>
            <button className="btn small" onClick={() => { setCursor(new Date(now.getFullYear(), now.getMonth(), 1)); setSelected(now); }}>Today</button>
            <button className="btn small" onClick={() => shift(1)} aria-label="Next month"><Icon name="chevronRight" size={14} /></button>
          </div>
        </div>
        <div className="cal-grid head">
          {weekdays.map((w) => <div key={w} className="cal-wd">{w}</div>)}
        </div>
        <div className="cal-grid">
          {cells.map((d, i) => {
            if (!d) return <div key={i} className="cal-cell empty" />;
            const ev = eventsOn(d);
            const kindSet = [...new Set(ev.map((e) => e.kind))];
            return (
              <button
                key={i}
                className={'cal-cell' + (sameDay(d, now) ? ' today' : '') + (sameDay(d, selected) ? ' selected' : '')}
                onClick={() => setSelected(d)}
                aria-label={`${d.toDateString()}, ${ev.length} events`}
              >
                <span className="cal-num">{d.getDate()}</span>
                <span className="dots">
                  {kindSet.map((k) => <i key={k} style={{ background: kinds[k].color }} />)}
                </span>
              </button>
            );
          })}
        </div>
        <div className="legend">
          {Object.entries(kinds).map(([k, v]) => (
            <span key={k}><i style={{ background: v.color }} />{v.label}</span>
          ))}
        </div>
      </div>

      <div className="stack">
        <div className="card">
          <div className="card-head">
            <h2>{isToday ? "Today's events" : selected.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}</h2>
            <span className="muted small">{dayEvents.length} event{dayEvents.length === 1 ? '' : 's'}</span>
          </div>
          {dayEvents.length === 0 ? (
            <p className="muted small">Nothing scheduled. A good time to clear follow-ups.</p>
          ) : (
            <ul className="list">
              {dayEvents.map((e) => (
                <li key={e.id} className="list-row">
                  <i className="bar-dot" style={{ background: kinds[e.kind].color }} />
                  <div className="grow">
                    <strong>{e.title}</strong>
                    <div className="muted small">{kinds[e.kind].label}</div>
                  </div>
                  <span className="small">{formatTime(e.start)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <div className="card-head"><h2>Month overview</h2><span className="muted small">{monthEvents.length} total</span></div>
          <ul className="list">
            {Object.entries(kinds).map(([k, v]) => {
              const n = monthEvents.filter((e) => e.kind === k).length;
              return (
                <li key={k} className="list-row">
                  <i className="bar-dot" style={{ background: v.color }} />
                  <span className="grow">{v.label}</span>
                  <strong>{n}</strong>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
