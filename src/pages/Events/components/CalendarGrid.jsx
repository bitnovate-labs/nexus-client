import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  format,
} from "date-fns";

const CalendarGrid = ({ currentDate, selectedDate, onSelectDate }) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded">
      <div className="grid grid-cols-7 gap-[1px] bg-gray-200 dark:bg-gray-700">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="p-2 text-center bg-white dark:bg-gray-800 font-medium dark:text-gray-200"
          >
            {day}
          </div>
        ))}
        {days.map((day) => (
          <div
            key={day.toString()}
            className={`
              p-4 min-h-[80px] cursor-pointer transition-colors
              bg-white dark:bg-gray-800 
              hover:bg-gray-50 dark:hover:bg-gray-700 
              ${
                !isSameMonth(day, currentDate)
                  ? "text-gray-400 dark:text-gray-500"
                  : "dark:text-gray-200"
              }
              ${
                selectedDate && isSameDay(day, selectedDate)
                  ? "bg-blue-50 dark:bg-blue-900/30"
                  : ""
              }
            `}
            onClick={() => onSelectDate(day)}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
