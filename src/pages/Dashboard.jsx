import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import LeadsModal from '../components/LeadsModal.jsx';
import { useCall } from '../components/CallContext.jsx';
import { agent, earningTasks, earnings, inr, kpis, leadsForTask, shiftProgress, waiting, weekly } from '../data.js';

const GREEN = '#1f7a5c';
const AMBER = '#e0a020';
const BLUE = '#3b6fd4';

export default function Dashboard() {
  const [task, setTask] = useState(null);
  const { startCall } = useCall();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const pct = Math.round((shiftProgress.done / shiftProgress.target) * 100);
  const visitPct = Math.round((shiftProgress.visitsDone / shiftProgress.visitsTarget) * 100);

  return (
    <div className="stack">
      <section className="hero">
        <div>
          <div className="hero-eyebrow">{greeting} 👋</div>
          <h2>{agent.name}</h2>
          <p>{agent.role} · shift {agent.shift}</p>
        </div>
        <div className="hero-stats">
          <div><strong>{shiftProgress.done}</strong><span>Calls today</span></div>
          <div><strong>{shiftProgress.visitsDone}</strong><span>Visits booked</span></div>
          <div><strong>{inr(earnings.today)}</strong><span>Earned today</span></div>
        </div>
      </section>

      <section className="kpi-grid">
        {kpis.map((k) => (
          <div className="card kpi" key={k.id}>
            <div className="label">{k.label}</div>
            <div className="kpi-value">{k.value}</div>
            <div className={'kpi-sub ' + k.tone}>{k.sub}</div>
          </div>
        ))}
      </section>

      <section className="grid-2">
        <div className="card dark">
          <div className="card-head"><h2>Shift progress</h2><span className="muted small">{pct}% of target</span></div>
          <div className="progress-row">
            <div className="row-between small"><span>Calls</span><strong>{shiftProgress.done} / {shiftProgress.target}</strong></div>
            <div className="bar"><span style={{ width: pct + '%' }} /></div>
          </div>
          <div className="progress-row">
            <div className="row-between small"><span>Store visits booked</span><strong>{shiftProgress.visitsDone} / {shiftProgress.visitsTarget}</strong></div>
            <div className="bar amber"><span style={{ width: visitPct + '%' }} /></div>
          </div>
          <p className="muted small mt">At this pace you finish at about 58 calls. Two more connected calls an hour closes the gap.</p>
        </div>

        <div className="card">
          <div className="card-head"><h2>Who is waiting</h2><span className="pill red">{waiting.length} on hold</span></div>
          <ul className="list">
            {waiting.map((w) => (
              <li key={w.id} className="list-row">
                <div className="grow">
                  <strong>{w.name}</strong>
                  <div className="muted small">{w.product} · {inr(w.value)}</div>
                </div>
                <span className="small wait">{w.waited}</span>
                <button className="btn small primary" onClick={() => startCall({ name: w.name, phone: '+91 98xxx xxxxx', product: w.product })}>
                  Call
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid-2">
        <div className="card">
          <div className="card-head">
            <h2>Earnings</h2>
            <span className="muted small">Incentives</span>
          </div>
          <div className="earn-row">
            <div><div className="label">Today</div><div className="earn">{inr(earnings.today)}</div></div>
            <div><div className="label">This week</div><div className="earn">{inr(earnings.week)}</div></div>
            <div><div className="label">This month</div><div className="earn">{inr(earnings.month)}</div></div>
          </div>
          <div className="label mt">Earn more today</div>
          <ul className="list">
            {earningTasks.map((t) => (
              <li key={t.id}>
                <button className="task" onClick={() => setTask(t)}>
                  <span className="grow">{t.label}</span>
                  <span className="reward">+{inr(t.reward)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <div className="card-head"><h2>Last 7 days</h2><span className="muted small">Calls</span></div>
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekly} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#e8ece9" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis tickLine={false} axisLine={false} fontSize={11} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="calls" name="Calls made" fill={GREEN} radius={[3, 3, 0, 0]} />
                <Bar dataKey="connected" name="Connected" fill={AMBER} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-head"><h2>Store visits booked, last 7 days</h2></div>
        <div className="chart short">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekly} margin={{ top: 4, right: 8, left: -22, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#e8ece9" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="visits" name="Visits" fill={BLUE} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {task && <LeadsModal title={task.label} leads={leadsForTask(task)} onClose={() => setTask(null)} />}
    </div>
  );
}
