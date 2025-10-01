import React from 'react';
import { UserProfile } from '../types';
import { MessageCircleIcon, IdCardIcon } from './icons';

interface CheckedInAttendeesProps {
  attendees: UserProfile[];
  onStartDirectChat: (attendee: UserProfile) => void;
  onRequestCard: (attendee: UserProfile) => void;
  connections: string[];
  contactRequests: string[];
  sentRequests: string[];
}

const CheckedInAttendees: React.FC<CheckedInAttendeesProps> = ({ attendees, onStartDirectChat, onRequestCard, connections, contactRequests, sentRequests }) => {
  
  const getButtonState = (attendeeId: string) => {
    if (connections.includes(attendeeId)) {
      return { text: 'Connected', disabled: true, style: 'bg-green-500/20 text-green-400 cursor-default' };
    }
    if (sentRequests.includes(attendeeId)) {
      return { text: 'Request Sent', disabled: true, style: 'bg-gray-light/20 text-gray-400 cursor-wait' };
    }
    if (contactRequests.includes(attendeeId)) {
        return { text: 'Respond', disabled: false, style: 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/40', action: () => {} }; // Action handled by main view nav
    }
    return { text: 'Request Card', disabled: false, style: 'bg-gray-light/20 text-white hover:bg-brand-secondary', action: () => onRequestCard(attendees.find(a => a.id === attendeeId)!) };
  }

  return (
    <div className="flex flex-col h-full bg-gray-dark">
      <header className="p-4 border-b border-gray-light/20 shadow-md">
        <h1 className="text-2xl font-bold text-white">Checked-In Attendees</h1>
        <p className="text-gray-400">See who is currently at the event and connect with them.</p>
      </header>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attendees.map((attendee) => {
            const cardButtonState = getButtonState(attendee.id);
            return (
              <div key={attendee.id} className="bg-gray-medium rounded-lg p-4 flex flex-col text-center border border-gray-light/20 transform transition-all hover:scale-105 hover:border-brand-primary">
                <div className="flex-grow">
                    <img
                        src={`https://i.pravatar.cc/150?u=${attendee.id}`}
                        alt={attendee.name}
                        className="w-24 h-24 rounded-full mb-4 border-4 border-gray-dark mx-auto"
                    />
                    <h3 className="font-bold text-lg text-white">{attendee.name}</h3>
                    <p className="text-sm text-gray-300">{attendee.title}</p>
                    <p className="text-xs text-gray-400 mb-3">{attendee.company}</p>
                    
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {attendee.interests.slice(0, 2).map(interest => (
                            <span key={interest} className="px-2 py-1 text-xs font-medium rounded-full bg-brand-primary/20 text-brand-secondary">
                                {interest}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-4 flex gap-2">
                    <button
                        onClick={() => onStartDirectChat(attendee)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-light/20 text-white font-semibold rounded-lg hover:bg-brand-primary transition-colors"
                        aria-label={`Start chat with ${attendee.name}`}
                    >
                        <MessageCircleIcon className="w-5 h-5" />
                        Message
                    </button>
                    <button
                        onClick={cardButtonState.action}
                        disabled={cardButtonState.disabled}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 font-semibold rounded-lg transition-colors ${cardButtonState.style}`}
                        aria-label={`Request contact card from ${attendee.name}`}
                    >
                        <IdCardIcon className="w-5 h-5" />
                        {cardButtonState.text}
                    </button>
                </div>
              </div>
            )
        })}
        </div>
      </div>
    </div>
  );
};

export default CheckedInAttendees;