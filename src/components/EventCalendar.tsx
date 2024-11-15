"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { formatTo12HourTime } from "@/lib/utils";
import FormModal from "./FormModal";
import { role } from "@/lib/data";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface Event {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  description: string;
  groupe: number;
  professeur: number;
}

export async function fetchEvents(id): Promise<Event[]> {
  try {
    if(id === null) {
      const response = await axios.get<Event[]>(
        "http://167.114.0.177:81/events",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } else {
      const response = await axios.get<Event[]>(
        `http://167.114.0.177:81/events/?professeur=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

const EventCalendar = ({id}) => {
  const [value, onChange] = useState<Value>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents(id);
        setEvents(data);
      } catch (error) {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white p-4 rounded-md">
      <Calendar onChange={onChange} value={value} />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        {/* <Image
          src="/create.png"
          alt=""
          width={20}
          height={20}
          className="cursor-pointer"
        /> */}
        {role === "admin" && (
          // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
          //   <Image src="/plus.png" alt="" width={14} height={14} />
          // </button>
          <FormModal table="event" type="create" />
        )}
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300 text-xs">
                {`${formatTo12HourTime(
                  event.start_time
                )} - ${formatTo12HourTime(event.end_time)}`}
              </span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
            <div className="flex items-center justify-end w-full gap-2">
              {/* <button
                onClick={async () => {
                  await axios.delete(
                    `http://167.114.0.177:81/events/delete/${event?.id}/`,
                    {
                      headers: {
                        "Content-Type": "application/json", // Define content type as JSON
                      },
                    }
                  );
                }}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple"
              >
                <Image src="/update.png" alt="" width={16} height={16} />
              </button> */}
              <FormModal
                table="event"
                type="update"
                id={event?.id}
                data={event}
              />
              <button
                onClick={async () => {
                  await axios.delete(
                    `http://167.114.0.177:81/events/delete/${event?.id}/`,
                    {
                      headers: {
                        "Content-Type": "application/json", // Define content type as JSON
                      },
                    }
                  );
                }}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple"
              >
                <Image src="/delete.png" alt="" width={16} height={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
