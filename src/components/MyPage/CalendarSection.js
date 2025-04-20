// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/mypage/CalendarSection.css';

import stamp from "../../assets/images/mypage/stamp.png";

export default function CalendarSection() {
 
  // Dates that user participates challenge
  const particChallDate = [
    '2025-04-10',
    '2025-04-13',
    '2025-04-14',
    '2025-04-15',
    '2025-04-16',
    '2025-04-17',
    '2025-04-18',
    '2025-04-19',
  ];

  const formatDateKST = (date) => {
    const tzOffset = date.getTimezoneOffset() * 60000; // 분 → 밀리초
    const localDate = new Date(date.getTime() - tzOffset);
    return localDate.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  return (
      <div className="w-full">
          {/* Calendar Body */}
          <Calendar
            mode="single"
            // month={currentMonth}
            // selected={selectedDate}
            className="border-none rounded-md"
            classNames={{
              months: "flex flex-col space-y-0 font-bold",
              month: "space-y-0",
              caption: "hidden", // Hide default caption
              table: "w-full border-collapse",
              head_row: "flex w-full h-12",
              head_cell:
                "flex-1 flex items-center justify-center font-m3-body-large text-[#1d1b20]",
              row: "flex w-full h-12",
              cell: "flex-1 flex items-center justify-center p-0 relative",
              day: "w-10 h-10 flex items-center justify-center",
              day_selected: "",
              day_today: "",
              day_disabled: "opacity-50",
            }}
            // components={{
            //   Day: renderDay,
            // }}
            fixedWeeks
            showOutsideDays={false}

            tileContent={({ date }) => {
              const dateString = formatDateKST(date); // KST 기준으로 날짜 비교              console.log(particChallDate.includes(dateString));
              if (particChallDate.includes(dateString)) {
                return (
                  <div className="stamp-wrapper">
                    <img src={stamp} alt="도장" className="stamp-image" />
                  </div>
                );
              }
              return null;
            }}
          />
      </div>
  );
}
