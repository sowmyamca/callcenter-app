# On-Ground Call Centre app

A rebuild of the On-Ground call centre agent app: the screen an agent keeps open through a shift.
Sample data only, no backend.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

Needs Node 18 or newer.

## Stack and why

- **React 18 + Vite.** Fast to start, component model fits the repeated pieces (rows, cards, modals).
- **React Router (HashRouter).** Every screen has its own URL, and deep links work on any static host with no server rewrite rules.
- **Recharts** for the dashboard charts.
- **Plain CSS** with CSS variables in `src/styles.css`. No UI kit, so type sizes and spacing stay restrained and easy to tune.
- **Data:** one mock module, `src/data.js`. Dates are generated relative to today so the calendar always looks current.

## Structure

```
src/
  data.js                  all sample data
  App.jsx                  routes and providers
  components/
    Shell.jsx              sidebar and top bar
    LeadsModal.jsx         lead card modal with Previous / Next paging
    CallContext.jsx        call overlay (real call + practice call) and toasts
    PulseContext.jsx       channel messages and "Needs your input" state
    Pager.jsx, Icon.jsx    small shared pieces
  pages/
    Dashboard.jsx          KPIs, progress, who is waiting, earnings tasks, 7-day charts
    Plan.jsx               Calls to make, Incoming, Recent
    Calendar.jsx           month grid, today's events, month overview
    Pulse.jsx              Pulse home and channel chat
```

## What is done

Must build

- App shell: sidebar and top bar
- Dashboard: KPI cards, shift progress, who is waiting, earnings and tasks, 7-day charts
- Plan: Calls to make (sorted by score, expandable rows, paging), Incoming (missed calls with value at stake and a callback in every row), Recent (filter by type, tap a call to review it)
- Calendar: month grid with event dots, today's events and month overview, month navigation
- Pulse home (anomalies, rules, task agents, channels and tracks) and a channel chat
- Leads modal with paging, opened from the dashboard task list, with collapsible buying signals

Bonus

- Send a message in a channel (with a simulated reply)
- Answer the "Needs your input" card (two buttons and an optional note)
- Practise a call and Call back (call overlay with timer, mute, hold, outcome logging)
- Works at phone width (bottom navigation, stacked layouts)
- Charts with Recharts

## What is skipped

- No backend or persistence: state resets on reload.
- Search box in the top bar is visual only.
- Practice call uses a fixed script, not a live AI shopper.
- No automated tests.

## AI tools used

- Claude (Anthropic), via Claude Code, was used to scaffold the project and write the first version of the code. I reviewed and edited the result and can explain any part of it.
