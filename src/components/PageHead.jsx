// Dark-blue heading band used at the top of Plan and Calendar.
export default function PageHead({ eyebrow, title }) {
  return (
    <div className="page-head">
      <div className="page-eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
    </div>
  );
}
