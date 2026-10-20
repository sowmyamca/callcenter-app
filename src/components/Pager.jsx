import Icon from './Icon.jsx';

// Shared paging footer: "1–6 of 36" with previous / next.
export default function Pager({ page, pageSize, total, onPage }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : page * pageSize + 1;
  const to = Math.min(total, (page + 1) * pageSize);
  return (
    <div className="pager">
      <span className="muted small">
        {from}–{to} of {total}
      </span>
      <div className="pager-btns">
        <button className="btn small" onClick={() => onPage(page - 1)} disabled={page === 0} aria-label="Previous page">
          <Icon name="chevronLeft" size={14} />
        </button>
        <span className="small">
          {page + 1} / {pages}
        </span>
        <button className="btn small" onClick={() => onPage(page + 1)} disabled={page >= pages - 1} aria-label="Next page">
          <Icon name="chevronRight" size={14} />
        </button>
      </div>
    </div>
  );
}
