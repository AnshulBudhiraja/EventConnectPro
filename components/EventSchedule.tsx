import React from 'react';
import { EVENT_SCHEDULE } from '../constants';
import { ScheduleEvent } from '../types';

const EventSchedule: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-dark">
      <header className="p-4 border-b border-gray-light/20 shadow-md">
        <h1 className="text-2xl font-bold text-white">Event Schedule</h1>
        <p className="text-gray-400">The official schedule for all talks and events.</p>
      </header>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="space-y-8">
          {EVENT_SCHEDULE.map((event: ScheduleEvent, index: number) => (
            <div key={index} className="flex gap-4 relative">
              <div className="w-24 text-right flex-shrink-0">
                <p className="font-bold text-brand-secondary">{event.time}</p>
                <p className="text-sm text-gray-400">to {event.endTime}</p>
              </div>
              <div className="absolute left-28 top-1 h-full border-l-2 border-dashed border-gray-light/30"></div>
              <div className="absolute left-[106px] top-[2px] w-4 h-4 rounded-full bg-brand-primary border-2 border-gray-dark"></div>
              <div className="pl-6 sm:pl-8 pb-4">
                <h4 className="font-bold text-lg text-white">{event.title}</h4>
                <p className="text-sm text-gray-300 mt-1">{event.speaker} &middot; <span className="italic">{event.location}</span></p>
                <p className="text-gray-400 mt-2 text-sm">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventSchedule;