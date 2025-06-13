// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import useAuthStore from "../User/UseAuthStore";
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/mypage/CalendarSection.css";

import stamp from "../../assets/images/mypage/stamp.png";

export default function CalendarSection({authDateList}) {
  // Dates that user participates challenge
  // const particChallDate = [
  //   "2025-04-10",
  //   "2025-04-13",
  //   "2025-04-14",
  //   "2025-04-15",
  //   "2025-04-16",
  //   "2025-04-17",
  //   "2025-04-18",
  //   "2025-04-19",
  // ];

  const [authDates, setAuthDates] = useState(authDateList || []);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { user_token } = useAuthStore();

  const fetchCalendarData = async (date) => {
    const ym = date.toISOString().slice(0, 7).replace("-", "");
    try {
      const res = await fetch(
        `http://localhost:8080/challenge/calendar?ym=${ym}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user_token}`,
          },
        }
      );

      const data = await res.json();

      if (data?.isSuccess) {
        console.log("캘린더 조회 성공하였습니다.");
        setAuthDates(data.result.authDates);
      } else {
        console.warn("응답 실패:", data.message);
        setAuthDates([]);
      }
    } catch (err) {
      console.error("fetch 에러:", err);
      setAuthDates([]);
    }
  };

  // useEffect(() => {
  //   fetchCalendarData(currentMonth);
  // }, []);

  const handleMonthChange = ({ activeStartDate }) => {
    const year = activeStartDate.getFullYear();
    const month = activeStartDate.getMonth() + 1;
    const ym = `${year}${month.toString().padStart(2, "0")}`;

    setCurrentMonth(new Date(year, month));
    fetchCalendarData(new Date(year, month));
  };

  const formatDateKST = (date) => {
    const tzOffset = date.getTimezoneOffset() * 60000; // 분 → 밀리초
    const localDate = new Date(date.getTime() - tzOffset);
    return localDate.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  return (
    <div className="w-full">
      <Calendar
        className="border-none rounded-md"
        fixedWeeks
        showOutsideDays={false}
        onActiveStartDateChange={handleMonthChange}
        tileContent={({ date }) => {
          const dateString = formatDateKST(date);
          if (authDates.includes(dateString)) {
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
