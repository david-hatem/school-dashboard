"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { calendarEvents } from "@/lib/data";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";

const localizer = momentLocalizer(moment);

const BigCalendar = ({ id }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // const loadEvents = async () => {
    //   try {
    //     const data = await fetchEvents(id);
    //     setEvents(data);
    //     // const x = data.map((e) => {
    //     //   return {
    //     //     title : e.title,
    //     //     allDay: false,
    //     //     start: e.start_time,
    //     //     end: e.end_time,
    //     //   }
    //     // });
    //     console.log("x----x",data);
    //   } catch (error) {
    //     setError("Failed to load events");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // loadEvents();
    console.log("x----x");
  }, []);

  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <Calendar
      localizer={localizer}
      // events={calendarEvents}
      events={events.map((e) => {
        return {
          title: e.title,
          allDay: false,
          start: e.start_time,
          end: e.end_time,
        };
      })}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day", "month"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={new Date(2023, 1, 0, 8, 0, 0)}
      max={new Date(2025, 1, 0, 17, 0, 0)}
    />
  );
};

export default BigCalendar;
