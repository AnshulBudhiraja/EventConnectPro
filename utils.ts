import { Badge } from './types';

export const getBadgeForEvents = (eventsAttended: number): Badge => {
  if (eventsAttended >= 20) return 'Platinum';
  if (eventsAttended >= 10) return 'Gold';
  if (eventsAttended >= 5) return 'Silver';
  if (eventsAttended >= 2) return 'Bronze';
  return 'Newcomer';
};
