import React from 'react';
import { UserProfile } from '../types';
import { GithubIcon, LinkIcon, LinkedinIcon, TwitterIcon, XIcon, UserPlusIcon } from './icons';

interface ConnectionsViewProps {
  requests: UserProfile[];
  connections: UserProfile[];
  onAccept: (requesterId: string) => void;
  onDecline: (requesterId: string) => void;
}

const socialIcons: { [key: string]: React.FC<any> } = {
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  github: GithubIcon,
  website: LinkIcon,
};

const ConnectionsView: React.FC<ConnectionsViewProps> = ({ requests, connections, onAccept, onDecline }) => {
  return (
    <div className="flex flex-col h-full bg-gray-dark">
      <header className="p-4 border-b border-gray-light/20 shadow-md">
        <h1 className="text-2xl font-bold text-white">Connections & Requests</h1>
        <p className="text-gray-400">Manage your contact card requests and view your connections.</p>
      </header>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-10">
        
        {/* Incoming Requests */}
        {requests.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Incoming Requests ({requests.length})</h2>
            <div className="space-y-4">
              {requests.map(req => (
                <div key={req.id} className="bg-gray-medium rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border border-gray-light/20">
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <img src={`https://i.pravatar.cc/150?u=${req.id}`} alt={req.name} className="w-12 h-12 rounded-full"/>
                    <div>
                      <h3 className="font-bold text-lg text-white">{req.name}</h3>
                      <p className="text-sm text-gray-300">{req.title} at {req.company}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button onClick={() => onAccept(req.id)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors">
                        <UserPlusIcon className="w-5 h-5"/> Accept
                    </button>
                    <button onClick={() => onDecline(req.id)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors">
                        <XIcon className="w-5 h-5"/> Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* My Connections */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">My Connections ({connections.length})</h2>
          {connections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {connections.map(conn => (
                <div key={conn.id} className="bg-gray-medium rounded-lg p-5 border border-gray-light/20">
                  <div className="flex items-start gap-4 mb-4">
                    <img src={`https://i.pravatar.cc/150?u=${conn.id}`} alt={conn.name} className="w-16 h-16 rounded-full border-2 border-brand-primary"/>
                    <div>
                      <h3 className="font-bold text-xl text-white">{conn.name}</h3>
                      <p className="text-md text-gray-300">{conn.title}</p>
                      <p className="text-sm text-gray-400">{conn.company}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                      {conn.interests.map(interest => (
                          <span key={interest} className="px-2 py-1 text-xs font-medium rounded-full bg-brand-primary/20 text-brand-secondary">
                              {interest}
                          </span>
                      ))}
                  </div>
                  {conn.contactCard && Object.keys(conn.contactCard).length > 0 ? (
                     <div className="space-y-2 pt-3 border-t border-gray-light/20">
                        {Object.entries(conn.contactCard).map(([key, value]) => {
                          // FIX: Add a type guard to ensure `value` is a string before using string methods on it.
                          if (typeof value !== 'string' || !value) return null;
                          const Icon = socialIcons[key];
                          return (
                            <a href={value} key={key} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 text-sm text-gray-300 rounded-md hover:bg-gray-dark/50 transition-colors">
                              <Icon className="w-5 h-5 text-gray-400"/>
                              <span className="truncate">{value.replace(/^(https?:\/\/)?(www\.)?/, '')}</span>
                            </a>
                          )
                        })}
                     </div>
                  ) : (
                    <p className="text-sm text-gray-500 pt-3 border-t border-gray-light/20">No contact card information provided.</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 px-4 bg-gray-medium rounded-lg border-2 border-dashed border-gray-light/30">
                <p className="text-gray-400">You haven't exchanged contact cards with anyone yet.</p>
                <p className="text-gray-500 text-sm mt-1">Visit the "Checked-In Attendees" tab to start connecting!</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default ConnectionsView;