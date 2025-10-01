import React, { useState, useEffect, useRef } from 'react';
import { DirectChat, UserProfile, Message } from '../types';
import { SendIcon } from './icons';

interface DirectMessageChatProps {
  chat: DirectChat;
  currentUser: UserProfile;
  onSendMessage: (text: string) => void;
}

const DirectMessageChat: React.FC<DirectMessageChatProps> = ({ chat, currentUser, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const otherParticipant = chat.participants.find(p => p.id !== currentUser.id);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    onSendMessage(newMessage);
    setNewMessage('');
  };
  
  if (!otherParticipant) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xl text-gray-400">Could not load chat.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-dark h-full">
      <header className="p-4 border-b border-gray-light/20 shadow-md flex items-center gap-3">
        <img src={`https://i.pravatar.cc/150?u=${otherParticipant.id}`} alt={otherParticipant.name} className="w-10 h-10 rounded-full" />
        <div>
          <h1 className="text-xl font-bold text-white">{otherParticipant.name}</h1>
          <p className="text-gray-400 text-sm">{otherParticipant.title} at {otherParticipant.company}</p>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.map(msg => (
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
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-light/20 flex items-center gap-2 bg-gray-medium">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={`Message ${otherParticipant.name}...`}
          className="flex-1 px-4 py-2 bg-gray-dark border border-gray-light rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition"
          aria-label="Your message"
        />
        <button type="submit" className="p-2 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition" aria-label="Send message">
          <SendIcon className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

export default DirectMessageChat;