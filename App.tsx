
import React, { useState, useCallback } from 'react';
import ProfileCreation from './components/ProfileCreation';
import MainView from './components/MainView';
import { UserProfile } from './types';

const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleProfileCreate = useCallback((profile: UserProfile) => {
    setUserProfile(profile);
  }, []);

  return (
    <div className="min-h-screen bg-gray-dark font-sans">
      {userProfile ? (
        <MainView userProfile={userProfile} />
      ) : (
        <ProfileCreation onProfileCreate={handleProfileCreate} />
      )}
    </div>
  );
};

export default App;
