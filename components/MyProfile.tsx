import React from 'react';
import { QRCodeCanvas as QRCode } from 'qrcode.react';
import { UserProfile } from '../types';
import { getBadgeForEvents } from '../utils';
import { QrCodeIcon, LinkedinIcon, TwitterIcon, GithubIcon, LinkIcon, BadgeIcon, UsersIcon } from './icons';

interface MyProfileProps {
  userProfile: UserProfile;
  totalConnections: number;
}

const socialIcons: { [key: string]: React.FC<any> } = {
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  github: GithubIcon,
  website: LinkIcon,
};

const MyProfile: React.FC<MyProfileProps> = ({ userProfile, totalConnections }) => {
  const qrCodeValue = JSON.stringify({
    id: userProfile.id,
    name: userProfile.name,
    company: userProfile.company,
    title: userProfile.title,
  });

  const userBadge = getBadgeForEvents(userProfile.eventsAttended);
  const hasContactCard = userProfile.contactCard && Object.keys(userProfile.contactCard).length > 0;

  return (
    <div className="flex flex-col h-full min-h-0 bg-gray-dark">
      <header className="p-4 border-b border-gray-light/20 shadow-md flex-shrink-0">
        <h1 className="text-2xl font-bold text-white">My Profile</h1>
        <p className="text-gray-400">Your personal information and connection code.</p>
      </header>
      <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col items-center justify-start md:justify-center">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: QR Code */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center bg-gray-medium p-6 sm:p-8 rounded-2xl border border-gray-light/20">
            <h3 className="font-semibold mb-4 text-white text-xl flex items-center gap-2">
              <QrCodeIcon className="w-6 h-6"/> Your Connect Code
            </h3>
            <div className="bg-white p-4 rounded-lg shadow-2xl shadow-brand-primary/20">
              <QRCode value={qrCodeValue} size={200} bgColor="#ffffff" fgColor="#000000" level="H" />
            </div>
            <p className="text-center text-gray-400 mt-4 text-sm">Have other attendees scan this code to connect with you instantly.</p>
          </div>

          {/* Right Side: Details */}
          <div className="lg:col-span-2 bg-gray-medium p-6 sm:p-8 rounded-2xl border border-gray-light/20 flex flex-col">
            <div className="mb-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">{userProfile.name}</h2>
              <p className="text-lg lg:text-xl text-gray-300">{userProfile.title}</p>
              <p className="text-md lg:text-lg text-gray-400">at {userProfile.company}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                <div className="bg-gray-dark/50 p-4 rounded-lg border border-gray-light/30">
                    <UsersIcon className="w-8 h-8 mx-auto text-brand-secondary mb-1" />
                    <p className="text-2xl font-bold text-white">{totalConnections}</p>
                    <p className="text-sm font-medium text-gray-400">Connections</p>
                </div>
                <div className="bg-gray-dark/50 p-4 rounded-lg border border-gray-light/30">
                    <BadgeIcon className="w-8 h-8 mx-auto text-brand-secondary mb-1" />
                    <p className="text-2xl font-bold text-white">{userBadge}</p>
                    <p className="text-sm font-medium text-gray-400">Badge</p>
                </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">Your Interests</h3>
              <div className="flex flex-wrap gap-3">
                {userProfile.interests.map(interest => (
                  <span key={interest} className="px-4 py-2 text-sm font-medium rounded-full bg-brand-primary/20 text-brand-secondary border-2 border-brand-primary/50">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

             {hasContactCard && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Contact Card</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(userProfile.contactCard!).map(([key, value]) => {
                    const Icon = socialIcons[key];
                    return (
                      <a href={value} key={key} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gray-dark/50 rounded-lg border border-gray-light/50 hover:border-brand-primary hover:bg-gray-dark transition-all">
                        <Icon className="w-6 h-6 text-brand-secondary" />
                        <span className="text-gray-300 capitalize truncate">{key}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
