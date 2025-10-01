import React, { useState, FormEvent } from 'react';
import { Interest, UserProfile, ContactCard } from '../types';
import { INTERESTS_LIST } from '../constants';
import { LogoIcon, UserPlusIcon } from './icons';

interface ProfileCreationProps {
  onProfileCreate: (profile: UserProfile) => void;
}

const ProfileCreation: React.FC<ProfileCreationProps> = ({ onProfileCreate }) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<Set<Interest>>(new Set());
  const [error, setError] = useState('');

  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [github, setGithub] = useState('');
  const [website, setWebsite] = useState('');

  const handleInterestToggle = (interest: Interest) => {
    setSelectedInterests(prev => {
      const newInterests = new Set(prev);
      if (newInterests.has(interest)) {
        newInterests.delete(interest);
      } else {
        newInterests.add(interest);
      }
      return newInterests;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !title || !company || selectedInterests.size === 0) {
      setError('Please fill out all fields and select at least one interest.');
      return;
    }
    setError('');

    const contactCard: ContactCard = {};
    if (linkedin) contactCard.linkedin = linkedin;
    if (twitter) contactCard.twitter = twitter;
    if (github) contactCard.github = github;
    if (website) contactCard.website = website;

    const profile: UserProfile = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name,
      title,
      company,
      interests: Array.from(selectedInterests),
      contactCard: Object.keys(contactCard).length > 0 ? contactCard : undefined,
      eventsAttended: 1, // Start with one event attended
    };
    onProfileCreate(profile);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-2 sm:p-4 bg-gradient-to-br from-gray-dark via-gray-900 to-black">
      <div className="w-full max-w-2xl bg-gray-medium rounded-2xl shadow-2xl shadow-brand-primary/20 border border-gray-light/20 p-6 sm:p-8 transform transition-all hover:scale-[1.01] duration-500">
        <div className="flex flex-col items-center mb-6">
          <LogoIcon className="w-16 h-16 mb-2 text-brand-primary" />
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Event Connect Pro</h1>
          <p className="text-gray-text mt-1 text-center">Create your profile to start networking</p>
        </div>
        
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-300">Your Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-gray-dark/50 border border-gray-light rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition" />
              <input type="text" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 bg-gray-dark/50 border border-gray-light rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition" />
            </div>
            <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full mt-6 px-4 py-3 bg-gray-dark/50 border border-gray-light rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition" />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-300">Contact Information (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="url" placeholder="LinkedIn Profile URL" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="w-full px-4 py-3 bg-gray-dark/50 border border-gray-light rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition" />
              <input type="url" placeholder="Twitter Profile URL" value={twitter} onChange={(e) => setTwitter(e.target.value)} className="w-full px-4 py-3 bg-gray-dark/50 border border-gray-light rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition" />
              <input type="url" placeholder="GitHub Profile URL" value={github} onChange={(e) => setGithub(e.target.value)} className="w-full px-4 py-3 bg-gray-dark/50 border border-gray-light rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition" />
              <input type="url" placeholder="Personal Website URL" value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full px-4 py-3 bg-gray-dark/50 border border-gray-light rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-center">Select Your Interests</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {INTERESTS_LIST.map(interest => (
                <button type="button" key={interest} onClick={() => handleInterestToggle(interest)} className={`px-4 py-2 text-sm font-medium rounded-full border-2 transition-all duration-300 ${ selectedInterests.has(interest) ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/30' : 'bg-gray-light/20 border-gray-light hover:border-brand-secondary hover:text-white' }`}>
                  {interest}
                </button>
              ))}
            </div>
          </div>
          
          <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-brand-primary/40">
            <UserPlusIcon className="w-5 h-5" />
            Create Profile & Connect
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileCreation;