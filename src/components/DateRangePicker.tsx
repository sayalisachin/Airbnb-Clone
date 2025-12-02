import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateRangePickerProps {
  checkIn: string;
  checkOut: string;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
}

export function DateRangePicker({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
}: DateRangePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const parseDate = (dateStr: string) => {
    return dateStr ? new Date(dateStr + 'T00:00:00') : null;
  };

  const isInRange = (day: number) => {
    const checkInDate = parseDate(checkIn);
    const checkOutDate = parseDate(checkOut);

    if (!checkInDate || !checkOutDate) return false;

    const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return currentDate > checkInDate && currentDate < checkOutDate;
  };

  const isCheckIn = (day: number) => {
    if (!checkIn) return false;
    const dateStr = formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    return dateStr === checkIn;
  };

  const isCheckOut = (day: number) => {
    if (!checkOut) return false;
    const dateStr = formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    return dateStr === checkOut;
  };

  const handleDayClick = (day: number) => {
    const dateStr = formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));

    if (!checkIn) {
      onCheckInChange(dateStr);
    } else if (!checkOut) {
      const checkInDate = parseDate(checkIn);
      const selectedDate = parseDate(dateStr);

      if (selectedDate && checkInDate && selectedDate > checkInDate) {
        onCheckOutChange(dateStr);
      } else {
        onCheckInChange(dateStr);
        onCheckOutChange('');
      }
    } else {
      onCheckInChange(dateStr);
      onCheckOutChange('');
    }
  };

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300 shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={previousMonth}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="font-semibold text-gray-900">{monthName}</h3>
        <button
          onClick={nextMonth}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-gray-600">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {emptyDays.map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map((day) => {
          const dateStr = formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
          const dayDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
          dayDate.setHours(0, 0, 0, 0);
          const isPast = dayDate < today;
          const isStart = isCheckIn(day);
          const isEnd = isCheckOut(day);
          const inRange = isInRange(day);

          return (
            <button
              key={day}
              onClick={() => !isPast && handleDayClick(day)}
              disabled={isPast}
              className={`
                w-8 h-8 rounded text-sm font-medium transition-colors
                ${isPast ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
                ${isStart || isEnd ? 'bg-rose-500 text-white' : ''}
                ${inRange && !isStart && !isEnd ? 'bg-rose-100 text-gray-900' : ''}
                ${!isStart && !isEnd && !inRange && !isPast ? 'hover:bg-gray-100' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
        <div>
          <label className="text-xs font-semibold text-gray-600">Check-in</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => onCheckInChange(e.target.value)}
            className="w-full mt-1 px-2 py-1 border border-gray-300 rounded text-sm outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">Check-out</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => onCheckOutChange(e.target.value)}
            className="w-full mt-1 px-2 py-1 border border-gray-300 rounded text-sm outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>
    </div>
  );
}
