import React, { useState, useEffect, useRef } from 'react';
import { Interest, UserProfile, Message } from '../types';
import { SendIcon, UsersIcon, MessageCircleIcon, XIcon } from './icons';

interface InterestChatProps {
  interest: Interest;
  currentUser: UserProfile;
  onStartDirectChat: (attendee: UserProfile) => void;
}

// Mock Data
const MOCK_ATTENDEES: { [key in Interest]: UserProfile[] } = {
  'AI/ML': [
    { 
      id: 'user-1', name: 'Alex Johnson', title: 'AI Researcher', company: 'Innovate AI', interests: ['AI/ML'], 
      // FIX: Added missing 'eventsAttended' property to satisfy the UserProfile type.
      eventsAttended: 15 
    },
    { 
      id: 'user-2', name: 'Brenda Smith', title: 'ML Engineer', company: 'DataCorp', interests: ['AI/ML', 'Web Development'], 
      // FIX: Added missing 'eventsAttended' property to satisfy the UserProfile type.
      eventsAttended: 3 
    },
  ],
  'Web Development': [
    { 
      id: 'user-3', name: 'Chris Lee', title: 'Frontend Dev', company: 'WebFlows', interests: ['Web Development', 'UX/UI Design'], 
      // FIX: Added missing 'eventsAttended' property to satisfy the UserProfile type.
      eventsAttended: 8 
    },
    { 
      id: 'user-2', name: 'Brenda Smith', title: 'ML Engineer', company: 'DataCorp', interests: ['AI/ML', 'Web Development'], 
      // FIX: Added missing 'eventsAttended' property to satisfy the UserProfile type.
      eventsAttended: 3 
    },
  ],
  'UX/UI Design': [
      { 
        id: 'user-4', name: 'Diana Prince', title: 'UX Designer', company: 'Creative Solutions', interests: ['UX/UI Design'], 
        // FIX: Added missing 'eventsAttended' property to satisfy the UserProfile type.
        eventsAttended: 1 
      },
      { 
        id: 'user-3', name: 'Chris Lee', title: 'Frontend Dev', company: 'WebFlows', interests: ['Web Development', 'UX/UI Design'], 
        // FIX: Added missing 'eventsAttended' property to satisfy the UserProfile type.
        eventsAttended: 8 
      },
  ],
  'Cybersecurity': [
      { 
        id: 'user-5', name: 'Edward Nigma', title: 'Security Analyst', company: 'SecureNet', interests: ['Cybersecurity'], 
        // FIX: Added missing 'eventsAttended' property to satisfy the UserProfile type.
        eventsAttended: 22 
      },
  ],
  'Blockchain': [
      { 
        id: 'user-6', name: 'Fiona Glenanne', title: 'Blockchain Dev', company: 'CryptoChain', interests: ['Blockchain'], 
        // FIX: Added missing 'eventsAttended' property to satisfy the UserProfile type.
        eventsAttended: 5 
      },
  ],
};

const MOCK_MESSAGES: { [key in Interest]: Message[] } = {
    'AI/ML': [
        { id: 'msg-1', author: {id: 'user-1', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?u=user-1'}, text: 'Excited for the keynote on generative models!', timestamp: '10:30 AM' },
        { id: 'msg-2', author: {id: 'user-2', name: 'Brenda Smith', avatar: 'https://i.pravatar.cc/150?u=user-2'}, text: 'Me too! The applications are expanding so quickly.', timestamp: '10:32 AM' },
    ],
    'Web Development': [
        { id: 'msg-3', author: {id: 'user-3', name: 'Chris Lee', avatar: 'https://i.pravatar.cc/150?u=user-3'}, text: 'Anyone attending the workshop on modern CSS frameworks?', timestamp: '11:00 AM' },
    ],
    'UX/UI Design': [],
    'Cybersecurity': [],
    'Blockchain': [],
};

const InterestChat: React.FC<InterestChatProps> = ({ interest, currentUser, onStartDirectChat }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAttendeesListOpen, setAttendeesListOpen] = useState(false);
  const attendees = [currentUser, ...MOCK_ATTENDEES[interest].filter(a => a.id !== currentUser.id)];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(MOCK_MESSAGES[interest] || []);
  }, [interest]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    const msg: Message = {
      id: `msg-${Date.now()}`,
      author: { id: currentUser.id, name: currentUser.name, avatar: `https://i.pravatar.cc/150?u=${currentUser.id}`},
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, msg]);
    setNewMessage('');
  };

  return (
    <div className="flex h-full relative overflow-hidden">
      <div className="flex-1 flex flex-col bg-gray-dark h-full">
        <header className="p-4 border-b border-gray-light/20 shadow-md flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white"># {interest}</h1>
            <p className="text-gray-400 text-sm md:text-base">A place for attendees interested in {interest} to connect.</p>
          </div>
          <button 
            onClick={() => setAttendeesListOpen(!isAttendeesListOpen)}
            className="p-2 rounded-full hover:bg-gray-light/20 lg:hidden"
            aria-label="Toggle attendees list"
          >
            <UsersIcon className="w-6 h-6" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex items-start gap-3 ${msg.author.id === currentUser.id ? 'flex-row-reverse' : ''}`}>
              <img src={msg.author.avatar} alt={msg.author.name} className="w-10 h-10 rounded-full" />
              <div className={`p-3 rounded-xl max-w-xs sm:max-w-md ${msg.author.id === currentUser.id ? 'bg-brand-primary text-white rounded-br-none' : 'bg-gray-medium text-gray-text rounded-bl-none'}`}>
                <div className="flex items-baseline gap-2">
                  <p className="font-semibold">{msg.author.name}</p>
                  <p className="text-xs text-gray-400">{msg.timestamp}</p>
                </div>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-light/20 flex items-center gap-2 bg-gray-medium flex-shrink-0">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message #${interest}...`}
            className="flex-1 px-4 py-2 bg-gray-dark border border-gray-light rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition"
          />
          <button type="submit" className="p-2 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition">
            <SendIcon className="w-6 h-6" />
          </button>
        </form>
      </div>

      <aside className={`w-64 bg-gray-medium border-l border-gray-light/20 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isAttendeesListOpen ? 'translate-x-0' : 'translate-x-full'} absolute inset-y-0 right-0 z-10 flex flex-col`}>
        <div className="p-4 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2"><UsersIcon className="w-5 h-5"/> Attendees</h3>
                <button onClick={() => setAttendeesListOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                    <XIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
        <ul className="space-y-3 overflow-y-auto px-4 pb-4">
          {attendees.map(attendee => (
            <li key={attendee.id} className="flex items-center gap-3 justify-between">
              <div className="flex items-center gap-3 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${attendee.id}`} alt={attendee.name} className="w-8 h-8 rounded-full flex-shrink-0" />
                  <div className="truncate">
                    <p className="font-medium text-white text-sm truncate">{attendee.name}</p>
                    <p className="text-xs text-gray-400 truncate">{attendee.title}</p>
                  </div>
              </div>
              {attendee.id !== currentUser.id && (
                <button
                  onClick={() => onStartDirectChat(attendee)}
                  className="text-gray-400 hover:text-brand-primary transition-colors flex-shrink-0"
                  aria-label={`Start chat with ${attendee.name}`}
                  title={`Start chat with ${attendee.name}`}
                >
                  <MessageCircleIcon className="w-5 h-5" />
                </button>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default InterestChat;