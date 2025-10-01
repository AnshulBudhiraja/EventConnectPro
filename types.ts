export type Interest = 'AI/ML' | 'Web Development' | 'UX/UI Design' | 'Cybersecurity' | 'Blockchain';
export type Badge = 'Newcomer' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface ContactCard {
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  title: string;
  company: string;
  interests: Interest[];
  contactCard?: ContactCard;
  eventsAttended: number;
}

export interface Message {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
}

export interface ScheduleEvent {
  time: string;
  endTime: string;
  title: string;
  speaker: string;
  location: string;
  description: string;
}

export interface DirectChat {
  id: string;
  participants: [UserProfile, UserProfile];
  messages: Message[];
}