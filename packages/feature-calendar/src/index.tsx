import React, { useState } from 'react';
import { Card, Button } from '@taskflow/ui-components';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const numDays = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">{monthName} <span className="text-gray-400 font-medium">{year}</span></h2>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={prevMonth}><ChevronLeft className="w-4 h-4" /></Button>
          <Button variant="secondary" size="sm" onClick={nextMonth}><ChevronRight className="w-4 h-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
        {dayNames.map(day => (
          <div key={day} className="bg-gray-50 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-white/40 h-32" />
        ))}
        {Array.from({ length: numDays }).map((_, i) => {
          const day = i + 1;
          const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
          return (
            <div key={day} className="bg-white h-32 p-3 hover:bg-gray-50 transition-colors cursor-pointer border-r border-b border-gray-50 group">
              <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                isToday ? 'bg-indigo-600 text-white' : 'text-gray-700 group-hover:text-indigo-600'
              }`}>
                {day}
              </span>
              <div className="mt-2 space-y-1">
                {day % 10 === 0 && <div className="h-1.5 w-full rounded-full bg-indigo-100" />}
                {day % 15 === 0 && <div className="h-1.5 w-full rounded-full bg-red-100" />}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
