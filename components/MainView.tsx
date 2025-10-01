import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { UserProfile, Interest, DirectChat, Message } from '../types';
import { MOCK_CHECKED_IN_ATTENDEES } from '../constants';
import { getBadgeForEvents } from '../utils';
import InterestChat from './InterestChat';
import QRScanner from './QRScanner';
import { CameraIcon, MessageSquareIcon, XIcon, CalendarIcon, UserIcon, MessageCircleIcon, ClipboardListIcon, IdCardIcon, MenuIcon, BadgeIcon } from './icons';
import EventSchedule from './EventSchedule';
import MyProfile from './MyProfile';
import DirectMessageChat from './DirectMessageChat';
import CheckedInAttendees from './CheckedInAttendees';
import ConnectionsView from './ConnectionsView';

interface MainViewProps {
  userProfile: UserProfile;
}

type ActiveView = 'chat' | 'schedule' | 'profile' | 'directMessage' | 'checkedIn' | 'connections';

const MainView: React.FC<MainViewProps> = ({ userProfile }) => {
  const [activeView, setActiveView] = useState<ActiveView>('profile');
  const [selectedInterest, setSelectedInterest] = useState<Interest | null>(null);
  const [isScannerOpen, setScannerOpen] = useState(false);
  const [connectionNotification, setConnectionNotification] = useState<string | null>(null);
  
  const [directChats, setDirectChats] = useState<DirectChat[]>([]);
  const [activeDirectChat, setActiveDirectChat] = useState<DirectChat | null>(null);

  const [contactRequests, setContactRequests] = useState<string[]>(['user-8']);
  const [sentRequests, setSentRequests] = useState<string[]>([]);
  const [connections, setConnections] = useState<string[]>(['user-1']);

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const badgeData = useMemo(() => ({
    Newcomer: { Icon: BadgeIcon, color: 'text-gray-400' },
    Bronze: { Icon: BadgeIcon, color: 'text-yellow-600' },
    Silver: { Icon: BadgeIcon, color: 'text-gray-300' },
    Gold: { Icon: BadgeIcon, color: 'text-yellow-400' },
    Platinum: { Icon: BadgeIcon, color: 'text-cyan-300' },
  }), []);

  const userBadge = getBadgeForEvents(userProfile.eventsAttended);
  const CurrentBadge = badgeData[userBadge];

  useEffect(() => {
    if (userProfile.interests.length > 0) {
      setSelectedInterest(userProfile.interests[0]);
    }
  }, [userProfile.interests]);

  const handleScanSuccess = useCallback((decodedText: string) => {
    setScannerOpen(false);
    try {
      const scannedProfile: Partial<UserProfile> = JSON.parse(decodedText);
      if (scannedProfile.id && scannedProfile.name) {
        setConnectionNotification(`Successfully connected with ${scannedProfile.name}!`);
      } else {
         setConnectionNotification('Connected with a new attendee!');
      }
    } catch (e) {
      console.error("Invalid QR code data", e);
      setConnectionNotification('Scanned an invalid QR code.');
    }
    setTimeout(() => setConnectionNotification(null), 5000);
  }, []);

  const handleScanError = useCallback((error: string) => {
    console.error(error);
    setScannerOpen(false);
    setConnectionNotification('Failed to start QR scanner. Please check camera permissions.');
    setTimeout(() => setConnectionNotification(null), 5000);
  }, []);
  
  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    setSidebarOpen(false);
  };

  const handleStartDirectChat = useCallback((attendee: UserProfile) => {
    const chatId = [userProfile.id, attendee.id].sort().join('-');
    const existingChat = directChats.find(c => c.id === chatId);

    if (existingChat) {
      setActiveDirectChat(existingChat);
    } else {
      const newChat: DirectChat = {
        id: chatId,
        participants: [userProfile, attendee],
        messages: [],
      };
      setDirectChats(prev => [...prev, newChat]);
      setActiveDirectChat(newChat);
    }
    handleNavClick('directMessage');
  }, [userProfile, directChats]);

  const handleSendDirectMessage = useCallback((text: string) => {
    if (!activeDirectChat) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      author: { id: userProfile.id, name: userProfile.name, avatar: `https://i.pravatar.cc/150?u=${userProfile.id}`},
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedChat = {
      ...activeDirectChat,
      messages: [...activeDirectChat.messages, newMessage],
    };

    setDirectChats(prev => prev.map(chat => chat.id === activeDirectChat.id ? updatedChat : chat));
    setActiveDirectChat(updatedChat);
  }, [activeDirectChat, userProfile]);

  const handleRequestCard = useCallback((attendee: UserProfile) => {
    if (sentRequests.includes(attendee.id) || connections.includes(attendee.id)) return;
    setSentRequests(prev => [...prev, attendee.id]);
    setConnectionNotification(`Contact request sent to ${attendee.name}.`);
    setTimeout(() => setConnectionNotification(null), 5000);
  }, [sentRequests, connections]);

  const handleAcceptRequest = useCallback((requesterId: string) => {
    setConnections(prev => [...prev, requesterId]);
    setContactRequests(prev => prev.filter(id => id !== requesterId));
    const requester = MOCK_CHECKED_IN_ATTENDEES.find(a => a.id === requesterId);
    setConnectionNotification(`You are now connected with ${requester?.name || 'an attendee'}!`);
    setTimeout(() => setConnectionNotification(null), 5000);
  }, []);
  
  const handleDeclineRequest = useCallback((requesterId: string) => {
    setContactRequests(prev => prev.filter(id => id !== requesterId));
  }, []);

  const getCurrentViewTitle = () => {
    switch (activeView) {
      case 'profile': return 'My Profile';
      case 'schedule': return 'Event Schedule';
      case 'checkedIn': return 'Checked-In Attendees';
      case 'connections': return 'Connections';
      case 'chat': return `# ${selectedInterest}`;
      case 'directMessage': return activeDirectChat?.participants.find(p => p.id !== userProfile.id)?.name || 'Direct Message';
      default: return 'Event Connect Pro';
    }
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'profile':
        return <MyProfile userProfile={userProfile} totalConnections={connections.length} />;
      case 'schedule':
        return <EventSchedule />;
      case 'checkedIn':
        return <CheckedInAttendees 
                  attendees={MOCK_CHECKED_IN_ATTENDEES.filter(a => a.id !== userProfile.id)} 
                  onStartDirectChat={handleStartDirectChat}
                  onRequestCard={handleRequestCard}
                  connections={connections}
                  contactRequests={contactRequests}
                  sentRequests={sentRequests}
                />;
      case 'connections':
        return <ConnectionsView 
                 requests={MOCK_CHECKED_IN_ATTENDEES.filter(a => contactRequests.includes(a.id))}
                 connections={MOCK_CHECKED_IN_ATTENDEES.filter(a => connections.includes(a.id))}
                 onAccept={handleAcceptRequest}
                 onDecline={handleDeclineRequest}
                />;
      case 'chat':
        return selectedInterest ? <InterestChat interest={selectedInterest} currentUser={userProfile} onStartDirectChat={handleStartDirectChat} /> : <div className="p-4">Select an interest to start chatting.</div>;
      case 'directMessage':
        return activeDirectChat ? <DirectMessageChat chat={activeDirectChat} currentUser={userProfile} onSendMessage={handleSendDirectMessage}/> : <div className="flex h-full items-center justify-center text-gray-400">Select a chat to view messages.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-full bg-gray-dark text-gray-text overflow-hidden md:flex">
      {isSidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}
      
      <aside className={`w-64 md:w-72 bg-gray-medium flex flex-col p-4 border-r border-gray-light/20 fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* User Profile Section */}
        <div className="p-4 mb-4 border-b border-gray-light/20 flex items-center gap-3">
          <img src={`https://i.pravatar.cc/150?u=${userProfile.id}`} alt={userProfile.name} className="w-12 h-12 rounded-full" />
          <div>
            <div className="flex items-center gap-2">
                <h2 className="font-bold text-white text-lg">{userProfile.name}</h2>
                <CurrentBadge.Icon className={`w-5 h-5 ${CurrentBadge.color}`} title={`${userBadge} Badge`} />
            </div>
            <p className="text-sm text-gray-400">{userProfile.title}</p>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-2">
          <button onClick={() => handleNavClick('profile')} className={`w-full text-left flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${activeView === 'profile' ? 'bg-brand-primary text-white' : 'hover:bg-gray-light/50'}`}>
            <UserIcon className="w-5 h-5" /> My Profile
          </button>
          <button onClick={() => handleNavClick('schedule')} className={`w-full text-left flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${activeView === 'schedule' ? 'bg-brand-primary text-white' : 'hover:bg-gray-light/50'}`}>
            <CalendarIcon className="w-5 h-5" /> Event Schedule
          </button>
          <button onClick={() => handleNavClick('checkedIn')} className={`w-full text-left flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${activeView === 'checkedIn' ? 'bg-brand-primary text-white' : 'hover:bg-gray-light/50'}`}>
            <ClipboardListIcon className="w-5 h-5" /> Checked-In Attendees
          </button>
           <button onClick={() => handleNavClick('connections')} className={`w-full text-left flex items-center gap-3 px-4 py-2 rounded-lg transition-colors relative ${activeView === 'connections' ? 'bg-brand-primary text-white' : 'hover:bg-gray-light/50'}`}>
            <IdCardIcon className="w-5 h-5" /> Connections
            {contactRequests.length > 0 && <span className="absolute top-1 right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{contactRequests.length}</span>}
          </button>
        </nav>

        {/* Interest Chats */}
        <div>
          <h3 className="px-4 py-2 text-sm font-semibold text-gray-400">Interest Chats</h3>
          <div className="space-y-1">
            {userProfile.interests.map(interest => (
              <button key={interest} onClick={() => { handleNavClick('chat'); setSelectedInterest(interest); }} className={`w-full text-left flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${activeView === 'chat' && selectedInterest === interest ? 'bg-brand-secondary text-white' : 'hover:bg-gray-light/50'}`}>
                <span className="font-bold text-brand-secondary">#</span> {interest}
              </button>
            ))}
          </div>
        </div>

        {/* QR Scanner Button */}
        <div className="mt-auto pt-4 border-t border-gray-light/20">
          <button onClick={() => setScannerOpen(true)} className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
            <CameraIcon className="w-5 h-5" /> Scan QR Code
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative h-full">
        {/* Mobile Header */}
        <header className="md:hidden p-4 bg-gray-medium border-b border-gray-light/20 flex items-center justify-between flex-shrink-0">
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-full hover:bg-gray-light/20">
              <MenuIcon className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-white">{getCurrentViewTitle()}</h1>
            <div className="w-8"></div> {/* Spacer */}
        </header>

        <div className="flex-1 min-h-0">
          {renderActiveView()}
        </div>

        {isScannerOpen && (
          <div className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-medium p-6 rounded-lg shadow-xl w-full max-w-md relative">
              <button onClick={() => setScannerOpen(false)} className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white">
                <XIcon className="w-6 h-6" />
              </button>
              <QRScanner onScanSuccess={handleScanSuccess} onError={handleScanError} />
            </div>
          </div>
        )}

        {connectionNotification && (
          <div className="absolute bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg animate-pulse">
            {connectionNotification}
          </div>
        )}
      </main>
    </div>
  );
};

export default MainView;
