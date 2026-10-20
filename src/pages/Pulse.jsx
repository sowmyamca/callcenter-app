import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { usePulse } from '../components/PulseContext.jsx';
import { formatTime, pulse } from '../data.js';

/* ---------- Pulse home: anomalies, rules, task agents, channels and tracks ---------- */

export default function PulseHome() {
  const { channels } = usePulse();
  const [rules, setRules] = useState(pulse.rules);
  const toggle = (id) => setRules((rs) => rs.map((r) => (r.id === id ? { ...r, on: !r.on } : r)));
  const open = (kind) => channels.filter((c) => c.kind === kind);

  return (
    <div className="stack">
      <div className="pulse-hero">
        <span className="avatar bot">A</span>
        <div className="grow">
          <div className="eyebrow light">AvaniBot<span className="online">online</span></div>
          <h2>3 things need a look today</h2>
          <p>I watch your calls, flag what is off, and nudge you before a lead goes cold.</p>
          <div className="hero-btns">
            <Link className="btn" to="/pulse/callbacks">Open callbacks</Link>
            <Link className="btn" to="/pulse/followups">Open follow-ups</Link>
          </div>
        </div>
      </div>

      <section className="card">
        <div className="card-head"><h2>Anomalies</h2><span className="muted small">Last 24 hours</span></div>
        <ul className="list">
          {pulse.anomalies.map((a) => (
            <li key={a.id}>
              <Link to={`/pulse/${a.channel}`} className="anomaly">
                <span className={'sev ' + a.severity}><Icon name="alert" size={15} /></span>
                <span className="grow">
                  <strong>{a.title}</strong>
                  <span className="muted small block">{a.detail}</span>
                </span>
                <Icon name="chevronRight" size={16} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid-2">
        <section className="card">
          <div className="card-head"><h2>Rules</h2></div>
          <ul className="list">
            {rules.map((r) => (
              <li key={r.id} className="list-row">
                <div className="grow">
                  <strong>{r.name}</strong>
                  <div className="muted small">{r.desc}</div>
                </div>
                <button className={'switch' + (r.on ? ' on' : '')} role="switch" aria-checked={r.on} aria-label={r.name} onClick={() => toggle(r.id)}>
                  <i />
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <div className="card-head"><h2>Task agents</h2></div>
          <ul className="list">
            {pulse.agents.map((a) => (
              <li key={a.id} className="list-row">
                <span className="avatar purple">{a.name[0]}</span>
                <div className="grow">
                  <strong>{a.name}</strong>
                  <div className="muted small">{a.last}</div>
                </div>
                <span className={'pill ' + (a.status === 'Working' ? 'green' : 'grey')}>{a.status}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid-2">
        <section className="card">
          <div className="card-head"><h2>Channels</h2></div>
          <ul className="list">
            {open('channel').map((c) => (
              <li key={c.id}>
                <Link to={`/pulse/${c.id}`} className="channel-link">
                  <Icon name="hash" size={16} />
                  <span className="grow">
                    <strong>{c.name}</strong>
                    <span className="muted small block">{c.messages[c.messages.length - 1].text}</span>
                  </span>
                  {c.needsInput && !c.needsInput.answer && <span className="pill amber">Needs input</span>}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="card">
          <div className="card-head"><h2>Tracks</h2></div>
          <ul className="list">
            {open('track').map((c) => (
              <li key={c.id}>
                <Link to={`/pulse/${c.id}`} className="channel-link">
                  <Icon name="pulse" size={16} />
                  <span className="grow">
                    <strong>{c.name}</strong>
                    <span className="muted small block">{c.topic}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="kudos">
        <strong>Kudos 🎉</strong>
        Karan (Manager) gave you kudos for booking 3 store visits yesterday.
      </div>
    </div>
  );
}

/* ---------- Channel chat ---------- */

export function Channel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { channels, send, answer } = usePulse();
  const channel = channels.find((c) => c.id === id);
  const [text, setText] = useState('');
  const [note, setNote] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [channel?.messages.length, channel?.needsInput?.answer]);

  if (!channel) return <Navigate to="/pulse" replace />;
  const ni = channel.needsInput;

  const submit = (e) => {
    e.preventDefault();
    send(channel.id, text);
    setText('');
  };

  return (
    <div className="chat">
      <div className="chat-head">
        <button className="btn small" onClick={() => navigate('/pulse')} aria-label="Back to Pulse">
          <Icon name="chevronLeft" size={14} /> Back
        </button>
        <div className="grow">
          <strong>{channel.kind === 'channel' ? '# ' : ''}{channel.name}</strong>
          <div className="muted small">{channel.topic} · {channel.members} members</div>
        </div>
      </div>

      {ni && (
        <div className={'needs' + (ni.answer ? ' done' : '')}>
          <div className="needs-tag">{ni.answer ? 'Answered' : 'Needs your input'}</div>
          <p>{ni.question}</p>
          {ni.answer ? (
            <p className="small"><strong>You chose:</strong> {ni.answer.option}{ni.answer.note ? ` · "${ni.answer.note}"` : ''}</p>
          ) : (
            <>
              <div className="needs-actions">
                {ni.options.map((o, i) => (
                  <button key={o} className={'btn' + (i === 0 ? ' primary' : '')} onClick={() => { answer(channel.id, o, note); setNote(''); }}>
                    {o}
                  </button>
                ))}
              </div>
              <input
                className="reply"
                placeholder="Add a note for the agent (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                aria-label="Note for the agent"
              />
            </>
          )}
        </div>
      )}

      <div className="messages">
        {channel.messages.map((m) => (
          <div key={m.id} className={'msg ' + m.side}>
            {m.side === 'left' && <span className="msg-from">{m.from}</span>}
            <div className="bubble">{m.text}</div>
            <span className="msg-time">{formatTime(m.at)}</span>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form className="composer" onSubmit={submit}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder={`Message ${channel.kind === 'channel' ? '#' : ''}${channel.name}`} aria-label="Message" />
        <button className="btn primary" type="submit" disabled={!text.trim()}>
          <Icon name="send" size={15} /> Send
        </button>
      </form>
    </div>
  );
}
