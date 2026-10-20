import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
import { useCall } from './CallContext.jsx';
import { inr } from '../data.js';

// One buying signal, collapsible on its own.
function Signal({ signal, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="signal">
      <button className="signal-head" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{signal.label}</span>
        <span className={'chev' + (open ? ' open' : '')}><Icon name="chevronDown" size={15} /></span>
      </button>
      {open && <div className="signal-body">{signal.detail}</div>}
    </div>
  );
}

// Opens from the dashboard task list. One lead per page, with Previous / Next paging.
export default function LeadsModal({ title, leads, onClose }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(true);
  const { startCall } = useCall();
  const lead = leads[index];
  const icp = Math.max(40, lead.score - 11); // sample ICP fit derived from the score

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(i + 1, leads.length - 1));
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [leads.length, onClose]);

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-head">
          <div className="grow">
            <div className="eyebrow">Leads · {title}</div>
            <div className="small">
              Lead {index + 1} of {leads.length} · {lead.lastContact}
            </div>
            <div className="dots-nav" aria-hidden="true">
              {leads.map((l, i) => <i key={l.id} className={i === index ? 'on' : ''} />)}
            </div>
          </div>
          <button className="modal-close static" onClick={onClose} aria-label="Close">
            <Icon name="close" size={16} />
          </button>
        </div>

        <div className="modal-body">
          <span className="open-tag">OPEN</span>
          <div className="lead-top mt">
            <span className="avatar lg">{lead.name.split(' ').map((p) => p[0]).join('')}</span>
            <div className="grow">
              <div className="lead-name">{lead.name}</div>
              <div className="muted small">
                <span className="mono">{lead.id}</span> · {lead.phone} · {lead.city}
              </div>
            </div>
            <div className="score" title="Lead score">
              <strong>{lead.score}</strong>
              <small>score</small>
            </div>
          </div>

          <div className="icp">
            <div className="row-between small"><span>ICP fit</span><strong>{icp}%</strong></div>
            <div className="bar"><span style={{ width: icp + '%' }} /></div>
          </div>
          <div className="intent"><span>Lead intent score</span><strong>{lead.score}</strong></div>

          <dl className="facts">
            <div><dt>Interested in</dt><dd>{lead.product}</dd></div>
            <div><dt>Stage</dt><dd>{lead.stage}</dd></div>
            <div><dt>Deal value</dt><dd>{inr(lead.value)}</dd></div>
            <div><dt>Source</dt><dd>{lead.source}</dd></div>
            <div><dt>Last contact</dt><dd>{lead.lastContact}</dd></div>
            <div><dt>Call due</dt><dd>{lead.due}</dd></div>
          </dl>

          <div className="note">{lead.note}</div>

          <button className="collapse-head" onClick={() => setOpen(!open)} aria-expanded={open}>
            <span>Buying signals ({lead.signals.length})</span>
            <span className={'chev' + (open ? ' open' : '')}><Icon name="chevronDown" size={16} /></span>
          </button>
          {open && lead.signals.map((s, i) => <Signal key={lead.id + s.label} signal={s} defaultOpen={i === 0} />)}
        </div>

        <div className="modal-foot">
          <button className="btn" onClick={() => setIndex(index - 1)} disabled={index === 0}>
            <Icon name="chevronLeft" size={15} /> Previous
          </button>
          <div className="foot-mid">
            <button className="btn" onClick={() => startCall({ name: lead.name, phone: lead.phone, product: lead.product, mode: 'practise' })}>
              Practise
            </button>
            <button className="btn primary" onClick={() => startCall({ name: lead.name, phone: lead.phone, product: lead.product })}>
              <Icon name="phone" size={15} /> Call
            </button>
          </div>
          <button className="btn" onClick={() => setIndex(index + 1)} disabled={index === leads.length - 1}>
            Next <Icon name="chevronRight" size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
