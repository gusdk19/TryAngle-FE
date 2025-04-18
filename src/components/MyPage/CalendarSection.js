// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export default function CalendarSection() {
  // Calendar data with special dates
  const currentMonth = new Date(2025, 7); // August 2025
  const selectedDate = new Date(2025, 7, 5); // August 5, 2025
  const highlightedDate = new Date(2025, 7, 17); // August 17, 2025

  // Dates with indicators (based on the image)
  const datesWithIndicators = [
    new Date(2025, 7, 6),
    new Date(2025, 7, 7),
    new Date(2025, 7, 8),
    new Date(2025, 7, 10),
    new Date(2025, 7, 13),
    new Date(2025, 7, 14),
    new Date(2025, 7, 15),
    new Date(2025, 7, 16),
  ];

  // Custom day rendering function
  const renderDay = (day, selectedDays, dayProps) => {
    const date = day.date;
    const isSelected =
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth();
    const isHighlighted =
      date.getDate() === highlightedDate.getDate() &&
      date.getMonth() === highlightedDate.getMonth();
    const hasIndicator = datesWithIndicators.some(
      (d) => d.getDate() === date.getDate() && d.getMonth() === date.getMonth(),
    );

    // Only render days for the current month
    if (date.getMonth() !== currentMonth.getMonth()) {
      return <div className="w-10 h-10"></div>;
    }

    return (
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full ${
          isHighlighted ? "bg-[#6e6053]" : ""
        } ${isSelected ? "border border-solid border-[#6e6053]" : ""}`}
      >
        {hasIndicator && !isHighlighted && (
          <div className="absolute w-10 h-10 rounded-full border border-[#f8c945] flex items-center justify-center"></div>
        )}
        <span
          className={`font-m3-body-large ${
            isHighlighted
              ? "text-[#fdf8ed] font-m3-label-large"
              : "text-[#1d1b20]"
          }`}
        ></span>
      </div>
    );
  };

  return (
    <></>
    // <Card className="w-full max-w-[345px] h-[345px] bg-[#fdf8ed] rounded-[20px] overflow-hidden border-none">
    //   <CardContent className="p-0 h-full">
    //     <div className="flex flex-col h-full">
    //       {/* Calendar Header */}
    //       <div className="flex items-center justify-between px-4 py-1">
    //         <div className="inline-flex items-center gap-2">
    //           <Button
    //             variant="ghost"
    //             className="rounded-full text-[#6e6053] px-3 py-2.5 h-auto"
    //           >
    //             <span className="font-m3-label-large">August 2025</span>
    //             <ChevronDown className="w-[18px] h-[18px] ml-1" />
    //           </Button>
    //         </div>

    //         <div className="flex items-center">
    //           <Button
    //             variant="ghost"
    //             size="icon"
    //             className="w-12 h-12 rounded-full"
    //           >
    //             <ChevronLeft className="w-6 h-6" />
    //           </Button>
    //           <Button
    //             variant="ghost"
    //             size="icon"
    //             className="w-12 h-12 rounded-full"
    //           >
    //             <ChevronRight className="w-6 h-6" />
    //           </Button>
    //         </div>
    //       </div>

    //       {/* Calendar Body */}
    //       <Calendar
    //         mode="single"
    //         month={currentMonth}
    //         selected={selectedDate}
    //         className="border-none"
    //         classNames={{
    //           months: "flex flex-col space-y-0",
    //           month: "space-y-0",
    //           caption: "hidden", // Hide default caption
    //           table: "w-full border-collapse",
    //           head_row: "flex w-full h-12",
    //           head_cell:
    //             "flex-1 flex items-center justify-center font-m3-body-large text-[#1d1b20]",
    //           row: "flex w-full h-12",
    //           cell: "flex-1 flex items-center justify-center p-0 relative",
    //           day: "w-10 h-10 flex items-center justify-center",
    //           day_selected: "",
    //           day_today: "",
    //           day_disabled: "opacity-50",
    //         }}
    //         components={{
    //           Day: renderDay,
    //         }}
    //         fixedWeeks
    //         showOutsideDays={false}
    //       />
    //     </div>
    //   </CardContent>
    // </Card>
  );
}
