import { createContext, useCallback, useContext, useState } from 'react';
import { initialChannels } from '../data.js';

// Channel state lives above the router so messages survive navigating away and back.

const PulseCtx = createContext(null);
export const usePulse = () => useContext(PulseCtx);

const botReply = (channel, text) => {
  if (channel.kind === 'track') return 'Noted. I will add that to your next practice scenario.';
  if (/discount|price/i.test(text)) return 'Understood. I will keep the offer within your approved range.';
  return 'Got it. I will update the list and let you know when it is done.';
};

export function PulseProvider({ children }) {
  const [channels, setChannels] = useState(initialChannels);

  const append = useCallback((id, msg) => {
    setChannels((cs) =>
      cs.map((c) => (c.id === id ? { ...c, messages: [...c.messages, { id: c.messages.length + 1, at: new Date(), ...msg }] } : c))
    );
  }, []);

  const send = useCallback(
    (id, text) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      append(id, { from: 'You', side: 'right', text: trimmed });
      const channel = channels.find((c) => c.id === id);
      setTimeout(() => {
        append(id, { from: channel.kind === 'track' ? 'Pitch coach' : 'Pulse', side: 'left', text: botReply(channel, trimmed) });
      }, 1100);
    },
    [append, channels]
  );

  const answer = useCallback(
    (id, option, note) => {
      setChannels((cs) => cs.map((c) => (c.id === id ? { ...c, needsInput: { ...c.needsInput, answer: { option, note } } } : c)));
      append(id, { from: 'You', side: 'right', text: note?.trim() ? `${option}. ${note.trim()}` : option });
      setTimeout(() => {
        append(id, { from: 'Follow-up agent', side: 'left', text: `Done. I will reply to Sana with: "${option}".` });
      }, 1100);
    },
    [append]
  );

  return <PulseCtx.Provider value={{ channels, send, answer }}>{children}</PulseCtx.Provider>;
}
