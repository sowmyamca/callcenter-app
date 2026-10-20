// All sample data lives here. No backend: pages import from this module.
// Dates are generated relative to "today" so the calendar always looks live.

const today = new Date();
const at = (offset, h, m = 0) =>
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset, h, m);

export const agent = {
  name: 'Sowmya Amin',
  initials: 'SA',
  role: 'Call centre agent',
  shift: '9:00 AM – 6:00 PM',
};

/* ---------- Dashboard ---------- */

export const kpis = [
  { id: 'calls', label: 'Calls made', value: '38', sub: '+6 vs yesterday', tone: 'up' },
  { id: 'connected', label: 'Connected', value: '24', sub: '63% connect rate', tone: 'up' },
  { id: 'visits', label: 'Store visits booked', value: '7', sub: '+2 vs yesterday', tone: 'up' },
  { id: 'talk', label: 'Avg talk time', value: '4m 12s', sub: '18s shorter than yesterday', tone: 'flat' },
];

export const shiftProgress = { done: 38, target: 60, visitsDone: 7, visitsTarget: 10 };

export const waiting = [
  { id: 'w1', name: 'Meera Joshi', product: 'Ortho mattress', waited: '3 min', value: 42000 },
  { id: 'w2', name: 'Rahul Menon', product: 'Recliner sofa', waited: '5 min', value: 78000 },
  { id: 'w3', name: 'Sana Qureshi', product: 'Bed + mattress combo', waited: '8 min', value: 56000 },
];

export const earnings = { today: 1850, week: 9640, month: 31200 };

// Each earnings task opens the Leads modal with its own list of lead ids.
export const earningTasks = [
  { id: 't1', label: 'Call back 6 missed leads', reward: 250, leadIds: ['L-1042', 'L-1017', 'L-1088', 'L-1031', 'L-1055', 'L-1009'] },
  { id: 't2', label: 'Book 3 more store visits', reward: 450, leadIds: ['L-1063', 'L-1024', 'L-1071', 'L-1046'] },
  { id: 't3', label: 'Clear 12 overdue follow-ups', reward: 600, leadIds: ['L-1002', 'L-1013', 'L-1019', 'L-1027', 'L-1035', 'L-1038', 'L-1049', 'L-1052', 'L-1060', 'L-1066', 'L-1074', 'L-1081'] },
];

const dayLabel = (back) =>
  new Date(today.getFullYear(), today.getMonth(), today.getDate() - back).toLocaleDateString('en-IN', { weekday: 'short' });

export const weekly = [6, 5, 4, 3, 2, 1, 0].map((back, i) => ({
  day: back === 0 ? 'Today' : dayLabel(back),
  calls: [44, 52, 47, 39, 55, 51, 38][i],
  connected: [27, 33, 29, 22, 35, 31, 24][i],
  visits: [4, 6, 5, 3, 8, 5, 7][i],
}));

/* ---------- Leads ---------- */

const firstNames = ['Aarav', 'Diya', 'Kabir', 'Isha', 'Vihaan', 'Anika', 'Rohan', 'Tara', 'Arjun', 'Naina', 'Dev', 'Kiara', 'Sameer', 'Pooja', 'Nikhil', 'Riya', 'Manav', 'Sneha', 'Yash', 'Ira', 'Harsh', 'Mira', 'Kunal', 'Zoya', 'Varun', 'Anaya', 'Tushar', 'Lavanya', 'Omkar', 'Charu', 'Dhruv', 'Ritika'];
const lastNames = ['Sharma', 'Iyer', 'Kapoor', 'Nair', 'Reddy', 'Bose', 'Mehta', 'Gill', 'Pillai', 'Das', 'Verma', 'Khan'];
const products = ['Ortho mattress', 'Recliner sofa', 'Bed + mattress combo', 'Dining set', 'Smart mattress', 'Work-from-home chair', 'Wardrobe', 'L-shape sofa'];
const cities = ['Bengaluru', 'Hyderabad', 'Pune', 'Delhi NCR', 'Chennai', 'Mumbai', 'Kochi', 'Jaipur'];
const stages = ['New', 'Contacted', 'Visited store', 'Quote sent', 'Negotiating'];
const sources = ['Walk-in (store)', 'Website form', 'WhatsApp', 'Missed call', 'Field visit'];
const signalPool = [
  ['Asked for EMI options', 'Asked about no-cost EMI twice on the last call.'],
  ['Compared with a competitor', 'Mentioned a rival quote about 8% cheaper.'],
  ['Visited store twice', 'Tried the product on both visits, about 20 minutes each.'],
  ['Moving house soon', 'Needs delivery before the 1st of next month.'],
  ['Spouse involved', 'Wants the family to see it before deciding.'],
  ['Price-sensitive', 'Asked about the festive discount three times.'],
  ['Opened the quote link', 'Opened the quote 4 times in the last two days.'],
  ['Replied on WhatsApp', 'Replied within 10 minutes to the last message.'],
];
const notePool = [
  'Prefers calls after 6 PM. Wants a firm mattress for back pain.',
  'Said they will decide this weekend. Send the 10-year warranty details.',
  'Asked for a video walkthrough. Interested in the extended trial.',
  'Budget is tight, so offer the combo bundle first.',
  'Came with family. Elder parent needs a higher-seat recliner.',
  'Wants delivery within a week. Confirm stock at the nearest store.',
];

const pad = (n) => String(n).padStart(2, '0');

export const leads = Array.from({ length: 36 }, (_, i) => {
  const n = 1000 + i * 2 + 2;
  const score = 98 - ((i * 7) % 47);
  return {
    id: `L-${n}`,
    name: `${firstNames[i % firstNames.length]} ${lastNames[(i * 5) % lastNames.length]}`,
    phone: `+91 9${(8100000 + i * 37171) % 10000000}`.replace(/(\d{5})(\d{5})$/, '$1 $2'),
    product: products[i % products.length],
    city: cities[(i * 3) % cities.length],
    score,
    stage: stages[i % stages.length],
    value: (18 + ((i * 13) % 70)) * 1000,
    source: sources[(i * 2) % sources.length],
    lastContact: `${1 + (i % 6)} day${i % 6 ? 's' : ''} ago`,
    due: `${pad(10 + (i % 8))}:${i % 2 ? '30' : '00'}`,
    note: notePool[i % notePool.length],
    signals: [signalPool[i % 8], signalPool[(i + 3) % 8], signalPool[(i + 5) % 8]].map(([label, detail]) => ({ label, detail })),
  };
}).sort((a, b) => b.score - a.score);

export const leadById = (id) => leads.find((l) => l.id === id);
// Some task ids are not in the generated list; fall back so tasks never open empty.
export const leadsForTask = (task) => {
  const found = task.leadIds.map(leadById).filter(Boolean);
  if (found.length >= Math.min(task.leadIds.length, 3)) return found;
  return leads.slice(0, task.leadIds.length);
};

/* ---------- Incoming (missed) ---------- */

export const incoming = [
  { id: 'm1', name: 'Priyanka Rao', phone: '+91 98450 22110', at: '10:42 AM', ago: '12 min ago', attempts: 2, product: 'Smart mattress', value: 64000 },
  { id: 'm2', name: 'Vikram Singh', phone: '+91 99001 48833', at: '10:15 AM', ago: '39 min ago', attempts: 1, product: 'L-shape sofa', value: 92000 },
  { id: 'm3', name: 'Neha Agarwal', phone: '+91 97311 90025', at: '9:58 AM', ago: '56 min ago', attempts: 3, product: 'Bed + mattress combo', value: 48000 },
  { id: 'm4', name: 'Imran Sheikh', phone: '+91 98860 71204', at: '9:41 AM', ago: '1 hr ago', attempts: 1, product: 'Dining set', value: 37000 },
  { id: 'm5', name: 'Lakshmi Narayan', phone: '+91 90350 66172', at: '9:20 AM', ago: '1 hr ago', attempts: 2, product: 'Ortho mattress', value: 29000 },
  { id: 'm6', name: 'Gaurav Malhotra', phone: '+91 98110 30987', at: 'Yesterday 5:48 PM', ago: '17 hr ago', attempts: 1, product: 'Recliner sofa', value: 71000 },
  { id: 'm7', name: 'Divya Menon', phone: '+91 94470 11829', at: 'Yesterday 4:12 PM', ago: '19 hr ago', attempts: 1, product: 'Wardrobe', value: 52000 },
  { id: 'm8', name: 'Faisal Ahmed', phone: '+91 99720 40461', at: 'Yesterday 2:30 PM', ago: '21 hr ago', attempts: 2, product: 'Work-from-home chair', value: 18000 },
];

/* ---------- Recent calls ---------- */

export const recent = [
  { id: 'r1', name: 'Meera Joshi', type: 'Outbound', at: '10:52 AM', duration: '5:41', outcome: 'Visit booked', summary: 'Confirmed Saturday 11 AM visit. Wants to test two firmness levels. Husband will join.', sentiment: 'Positive' },
  { id: 'r2', name: 'Rahul Menon', type: 'Inbound', at: '10:31 AM', duration: '3:12', outcome: 'Quote sent', summary: 'Asked for recliner dimensions and delivery time. Quote sent on WhatsApp.', sentiment: 'Neutral' },
  { id: 'r3', name: 'Sana Qureshi', type: 'Outbound', at: '10:05 AM', duration: '7:20', outcome: 'Negotiating', summary: 'Likes the combo but asked for a 10% discount. Escalated to the store manager.', sentiment: 'Positive' },
  { id: 'r4', name: 'Tarun Bhatia', type: 'Outbound', at: '9:48 AM', duration: '0:42', outcome: 'No answer', summary: 'Voicemail left. Retry after 2 PM.', sentiment: 'Neutral' },
  { id: 'r5', name: 'Pallavi Desai', type: 'Inbound', at: '9:36 AM', duration: '2:55', outcome: 'Call back later', summary: 'In a meeting. Asked to call at 6 PM.', sentiment: 'Neutral' },
  { id: 'r6', name: 'Joseph Mathew', type: 'Outbound', at: '9:14 AM', duration: '4:09', outcome: 'Not interested', summary: 'Bought from a competitor last week. Closed as lost.', sentiment: 'Negative' },
  { id: 'r7', name: 'Anjali Thakur', type: 'Outbound', at: 'Yesterday', duration: '6:03', outcome: 'Visit booked', summary: 'Booked a store visit for Friday evening with her parents.', sentiment: 'Positive' },
  { id: 'r8', name: 'Rakesh Pandey', type: 'Inbound', at: 'Yesterday', duration: '1:48', outcome: 'Quote sent', summary: 'Wanted EMI details. Sent the 12-month no-cost EMI breakdown.', sentiment: 'Neutral' },
  { id: 'r9', name: 'Shreya Kulkarni', type: 'Outbound', at: 'Yesterday', duration: '3:37', outcome: 'Call back later', summary: 'Waiting for a salary credit. Call on the 1st.', sentiment: 'Neutral' },
  { id: 'r10', name: 'Mohit Arora', type: 'Outbound', at: 'Yesterday', duration: '5:15', outcome: 'Visit booked', summary: 'Booked a Sunday visit. Interested in the smart mattress trial.', sentiment: 'Positive' },
];

/* ---------- Calendar ---------- */

export const calendarEvents = [
  [-9, 11, 0, 'Store visit: Anjali Thakur', 'visit'],
  [-6, 15, 0, 'Product training: smart mattress', 'training'],
  [-3, 10, 30, 'Follow-up call: Mohit Arora', 'call'],
  [-2, 17, 0, 'Team huddle', 'meeting'],
  [-1, 12, 0, 'Follow-up call: Pallavi Desai', 'call'],
  [0, 9, 30, 'Team huddle', 'meeting'],
  [0, 11, 0, 'Store visit: Meera Joshi', 'visit'],
  [0, 14, 0, 'Call back: Neha Agarwal', 'call'],
  [0, 18, 0, 'Call back: Pallavi Desai', 'call'],
  [1, 10, 0, 'Follow-up call: Rahul Menon', 'call'],
  [1, 16, 30, 'Coaching with Karan', 'meeting'],
  [2, 11, 30, 'Store visit: Sana Qureshi', 'visit'],
  [4, 15, 0, 'Objection handling workshop', 'training'],
  [5, 10, 0, 'Follow-up call: Vikram Singh', 'call'],
  [7, 11, 0, 'Store visit: Shreya Kulkarni', 'visit'],
  [9, 9, 30, 'Weekly review', 'meeting'],
  [11, 14, 0, 'Follow-up call: Imran Sheikh', 'call'],
  [13, 12, 0, 'Store visit: Lakshmi Narayan', 'visit'],
  [16, 10, 30, 'Festive campaign briefing', 'training'],
].map(([off, h, m, title, kind], i) => ({ id: `e${i}`, title, kind, start: at(off, h, m) }));

/* ---------- Pulse ---------- */

export const pulse = {
  anomalies: [
    { id: 'a1', severity: 'high', title: 'Missed-call callbacks are slow', detail: '5 missed calls waited more than 30 minutes. Target is 15.', channel: 'callbacks' },
    { id: 'a2', severity: 'med', title: 'Connect rate dipped after 2 PM', detail: 'Down 11 points over the last 3 days for your shift.', channel: 'followups' },
    { id: 'a3', severity: 'low', title: 'Visit bookings are above target', detail: '7 of 10 booked with 3 hours of shift left.', channel: 'walkouts' },
  ],
  rules: [
    { id: 'rl1', name: 'Call back missed leads in 15 minutes', desc: 'Alerts you and your manager if a missed call is not returned.', on: true },
    { id: 'rl2', name: 'Name the shopper in the first line', desc: 'Prompts you with the shopper name and last product viewed.', on: true },
    { id: 'rl3', name: 'No lead idle more than 3 days', desc: 'Moves idle leads to the top of Calls to make.', on: false },
  ],
  agents: [
    { id: 'ag1', name: 'Follow-up agent', status: 'Working', last: 'Drafted 9 WhatsApp follow-ups' },
    { id: 'ag2', name: 'Walk-out recovery', status: 'Idle', last: 'Matched 4 walk-outs to leads' },
    { id: 'ag3', name: 'Pitch coach', status: 'Working', last: 'Reviewing your 10:05 call' },
  ],
};

const t = (h, m) => at(0, h, m);

export const initialChannels = [
  {
    id: 'followups',
    kind: 'channel',
    name: 'follow-ups',
    topic: 'Daily follow-up list and nudges',
    members: 6,
    needsInput: {
      question: 'Sana Qureshi asked for a 10% discount on the combo. Allowed range for you is 5%. How should I reply?',
      options: ['Offer 5% and a free pillow', 'Escalate to Karan'],
      answer: null,
    },
    messages: [
      { id: 1, from: 'Follow-up agent', side: 'left', text: 'Good morning Ananya. 14 follow-ups are due today. 3 are marked hot.', at: t(9, 5) },
      { id: 2, from: 'Karan (Manager)', side: 'left', text: 'Start with the hot ones. Sana and Rahul are close to deciding.', at: t(9, 12) },
      { id: 3, from: 'You', side: 'right', text: 'On it. Calling Meera first, she has a visit slot open.', at: t(9, 14) },
      { id: 4, from: 'Follow-up agent', side: 'left', text: 'Meera Joshi booked a visit for Saturday 11 AM. Added to your calendar.', at: t(10, 56) },
      { id: 5, from: 'Follow-up agent', side: 'left', text: 'Sana Qureshi replied on WhatsApp about the discount. I need your input.', at: t(11, 8) },
    ],
  },
  {
    id: 'callbacks',
    kind: 'channel',
    name: 'callbacks',
    topic: 'Missed calls and callback SLAs',
    members: 5,
    needsInput: null,
    messages: [
      { id: 1, from: 'Pulse', side: 'left', text: '5 missed calls are waiting more than 30 minutes.', at: t(10, 45) },
      { id: 2, from: 'Karan (Manager)', side: 'left', text: 'Ananya, can you clear Priyanka and Vikram first? Both are high value.', at: t(10, 50) },
    ],
  },
  {
    id: 'walkouts',
    kind: 'channel',
    name: 'walk-out-recovery',
    topic: 'Store walk-ins who left without buying',
    members: 8,
    needsInput: null,
    messages: [
      { id: 1, from: 'Walk-out recovery', side: 'left', text: '4 walk-ins from yesterday were matched to phone numbers. Added to Calls to make.', at: t(9, 30) },
      { id: 2, from: 'You', side: 'right', text: 'Thanks. I will start with the recliner shoppers.', at: t(9, 33) },
    ],
  },
  {
    id: 'track-pitch',
    kind: 'track',
    name: 'Pitch skills track',
    topic: 'Week 3: handling price objections',
    members: 12,
    needsInput: null,
    messages: [
      { id: 1, from: 'Pitch coach', side: 'left', text: 'Your last call: strong opening, but you quoted the price before the benefits. Try benefits first.', at: t(10, 20) },
    ],
  },
  {
    id: 'track-product',
    kind: 'track',
    name: 'Product knowledge track',
    topic: 'Smart mattress certification',
    members: 12,
    needsInput: null,
    messages: [
      { id: 1, from: 'Pulse', side: 'left', text: 'Module 2 of 5 is ready: sleep-tracking features.', at: t(9, 0) },
    ],
  },
];

export const formatTime = (d) =>
  d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase();

export const inr = (n) => '₹' + n.toLocaleString('en-IN');
