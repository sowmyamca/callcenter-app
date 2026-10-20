import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';

// One place to start a real call ("Call back") or a practice call ("Practise a call").
// Pages call startCall({ name, phone, product, mode }) and the overlay is rendered here.

const CallCtx = createContext(null);
export const useCall = () => useContext(CallCtx);

const practiceLines = [
  { who: 'Customer', text: 'Hi, I was looking at the ortho mattress. Honestly, it feels expensive.' },
  { who: 'Tip', text: 'Do not drop the price yet. Ask what they are comparing it with.' },
  { who: 'Customer', text: 'Another brand has one for about 8,000 less.' },
  { who: 'Tip', text: 'Lead with benefits: 10-year warranty, 100-night trial, no-cost EMI.' },
  { who: 'Customer', text: 'EMI is useful. Can I try it before buying?' },
  { who: 'Tip', text: 'Good moment to close: offer a store visit slot this weekend.' },
];

const outcomes = ['Visit booked', 'Call back later', 'Quote sent', 'Not interested'];

const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export function CallProvider({ children }) {
  const [call, setCall] = useState(null);
  const [toast, setToast] = useState('');
  const toastTimer = useRef();

  const startCall = useCallback((c) => setCall({ mode: 'call', ...c }), []);
  const showToast = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 3000);
  }, []);

  return (
    <CallCtx.Provider value={{ startCall }}>
      {children}
      {call && (
        <CallOverlay
          call={call}
          onClose={(msg) => {
            setCall(null);
            if (msg) showToast(msg);
          }}
        />
      )}
      {toast && <div className="toast" role="status">{toast}</div>}
    </CallCtx.Provider>
  );
}

function CallOverlay({ call, onClose }) {
  const practise = call.mode === 'practise';
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [held, setHeld] = useState(false);
  const [step, setStep] = useState(0);
  const [ended, setEnded] = useState(false);
  const [outcome, setOutcome] = useState('');

  useEffect(() => {
    if (ended || held) return undefined;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [ended, held]);

  const lines = practiceLines.slice(0, step + 1);

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label={practise ? 'Practice call' : 'Call'}>
      <div className="call-card">
        <button className="modal-close" onClick={() => onClose()} aria-label="Close">
          <Icon name="close" size={16} />
        </button>
        <div className="call-head">
          <span className="avatar lg">{call.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}</span>
          <div>
            <div className="call-name">{call.name}</div>
            <div className="muted small">
              {practise ? 'Practice call · AI shopper' : call.phone} {call.product ? `· ${call.product}` : ''}
            </div>
          </div>
          <div className={'call-timer' + (held ? ' held' : '')}>{held ? 'On hold' : mmss(seconds)}</div>
        </div>

        {practise && !ended && (
          <div className="practice-box">
            {lines.map((l, i) => (
              <div key={i} className={'pl ' + (l.who === 'Tip' ? 'tip' : 'cust')}>
                <span className="pl-who">{l.who}</span>
                {l.text}
              </div>
            ))}
            {step < practiceLines.length - 1 ? (
              <button className="btn small" onClick={() => setStep((s) => Math.min(s + 2, practiceLines.length - 1))}>
                Respond and continue
              </button>
            ) : (
              <div className="muted small">End of scenario. Hang up to log how it went.</div>
            )}
          </div>
        )}

        {!ended ? (
          <div className="call-actions">
            <button className={'round' + (muted ? ' on' : '')} onClick={() => setMuted(!muted)} aria-pressed={muted}>
              <Icon name="mic" /> <span>{muted ? 'Unmute' : 'Mute'}</span>
            </button>
            <button className={'round' + (held ? ' on' : '')} onClick={() => setHeld(!held)} aria-pressed={held}>
              <Icon name="pause" /> <span>{held ? 'Resume' : 'Hold'}</span>
            </button>
            <button className="round end" onClick={() => setEnded(true)}>
              <Icon name="phone" /> <span>End call</span>
            </button>
          </div>
        ) : (
          <div className="outcome">
            <div className="label">How did it go?</div>
            <div className="chips">
              {outcomes.map((o) => (
                <button key={o} className={'chip' + (outcome === o ? ' active' : '')} onClick={() => setOutcome(o)}>
                  {o}
                </button>
              ))}
            </div>
            <button
              className="btn primary"
              disabled={!outcome}
              onClick={() =>
                onClose(practise ? `Practice logged: ${outcome}` : `Call with ${call.name} saved: ${outcome}`)
              }
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
