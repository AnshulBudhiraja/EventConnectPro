import { Interest, ScheduleEvent, UserProfile } from './types';

export const INTERESTS_LIST: Interest[] = [
  'AI/ML',
  'Web Development',
  'UX/UI Design',
  'Cybersecurity',
  'Blockchain',
];

export const MOCK_CHECKED_IN_ATTENDEES: UserProfile[] = [
    { 
      id: 'user-1', name: 'Alex Johnson', title: 'AI Researcher', company: 'Innovate AI', interests: ['AI/ML'],
      contactCard: { linkedin: 'https://linkedin.com/in/alexjohnson', github: 'https://github.com/alexj' },
      // FIX: Added missing 'eventsAttended' property to satisfy the UserProfile type.
      eventsAttended: 15,
    },
    { 
      id: 'user-2', name: 'Brenda Smith', title: 'ML Engineer', company: 'DataCorp', interests: ['AI/ML', 'Web Development'],
      contactCard: { linkedin: 'https://linkedin.com/in/brendasmith', twitter: 'https://twitter.com/brendas' },
      // FIX: Added missing 'eventsAttended' property to satisfy the UserProfile type.
      eventsAttended: 3,
    },
    { 
      id: 'user-3', name: 'Chris Lee', title: 'Frontend Dev', company: 'WebFlows', interests: ['Web Development', 'UX/UI Design'],
      contactCard: { github: 'https://github.com/chrisl', website: 'https://chrislee.dev' },
      // FIX: Added missing 'eventsAttended' property to satisfy the UserProfile type.
      eventsAttended: 8,
    },
    { 
      id: 'user-4', name: 'Diana Prince', title: 'UX Designer', company: 'Creative Solutions', interests: ['UX/UI Design'],
      contactCard: { linkedin: 'https://linkedin.com/in/dianaprince', website: 'https://dianaprince.design' },
      // FIX: Added missing 'eventsAttended' property to satisfy the UserProfile type.
      eventsAttended: 1,
    },
    { 
      id: 'user-5', name: 'Edward Nigma', title: 'Security Analyst', company: 'SecureNet', interests: ['Cybersecurity'],
      contactCard: { twitter: 'https://twitter.com/enigma' },
      // FIX: Added missing 'eventsAttended' property to satisfy the UserProfile type.
      eventsAttended: 22,
    },
    { 
      id: 'user-6', name: 'Fiona Glenanne', title: 'Blockchain Dev', company: 'CryptoChain', interests: ['Blockchain'],
      contactCard: { linkedin: 'https://linkedin.com/in/fionag' },
      // FIX: Added missing 'eventsAttended' property to satisfy the UserProfile type.
      eventsAttended: 5,
    },
    { 
      id: 'user-7', name: 'George Costanza', title: 'Architect', company: 'Vandelay Industries', interests: ['Web Development'],
      contactCard: { website: 'https://vandelay.com' },
      // FIX: Added missing 'eventsAttended' property to satisfy the UserProfile type.
      eventsAttended: 2,
    },
    { 
      id: 'user-8', name: 'Helen Chu', title: 'Product Manager', company: 'Cyber Solutions', interests: ['UX/UI Design', 'Cybersecurity'],
      contactCard: { linkedin: 'https://linkedin.com/in/helenchu', twitter: 'https://twitter.com/helenchu' },
      // FIX: Added missing 'eventsAttended' property to satisfy the UserProfile type.
      eventsAttended: 12,
    },
];

export const EVENT_SCHEDULE: ScheduleEvent[] = [
  {
    time: '09:00 AM',
    endTime: '10:00 AM',
    title: 'Opening Keynote: The Future of Connected Technology',
    speaker: 'Jane Doe, CEO of TechCorp',
    location: 'Main Auditorium',
    description: 'Join us for an inspiring look into the next decade of technological innovation and how it will shape our world.'
  },
  {
    time: '10:30 AM',
    endTime: '11:30 AM',
    title: 'Deep Dive into Generative AI',
    speaker: 'Alex Johnson',
    location: 'Hall A, Room 101',
    description: 'An expert session on the latest advancements in generative models, their applications, and ethical considerations. (AI/ML)'
  },
  {
    time: '10:30 AM',
    endTime: '11:30 AM',
    title: 'Modern Frontend Frameworks in 2024',
    speaker: 'Chris Lee',
    location: 'Hall B, Room 202',
    description: 'A comparative analysis of the leading frontend frameworks and a live coding session to build a reactive component. (Web Development)'
  },
  {
    time: '12:00 PM',
    endTime: '01:00 PM',
    title: 'Lunch & Networking',
    speaker: 'All Attendees',
    location: 'Exhibition Hall',
    description: 'Grab a bite, recharge, and connect with fellow attendees and speakers.'
  },
  {
    time: '01:30 PM',
    endTime: '02:30 PM',
    title: 'Designing for Emotion: A UX Workshop',
    speaker: 'Diana Prince',
    location: 'Hall C, Workshop Zone',
    description: 'An interactive workshop focusing on user-centric design principles that create delightful and memorable experiences. (UX/UI Design)'
  },
  {
    time: '01:30 PM',
    endTime: '02:30 PM',
    title: 'The Zero Trust Security Model',
    speaker: 'Edward Nigma',
    location: 'Hall A, Room 102',
    description: 'Learn how to implement a Zero Trust architecture to secure your organization\'s data and infrastructure in a perimeter-less world. (Cybersecurity)'
  },
  {
    time: '03:00 PM',
    endTime: '04:00 PM',
    title: 'Decentralized Finance (DeFi) Explained',
    speaker: 'Fiona Glenanne',
    location: 'Hall B, Room 203',
    description: 'A comprehensive overview of the DeFi ecosystem, its core components, and the potential to revolutionize finance. (Blockchain)'
  },
  {
    time: '04:30 PM',
    endTime: '05:00 PM',
    title: 'Closing Remarks & Future Outlook',
    speaker: 'Event Organizers',
    location: 'Main Auditorium',
    description: 'A recap of the day\'s highlights and a look forward to the future of the industry and our community.'
  },
];