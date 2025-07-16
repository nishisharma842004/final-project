// src/pages/Pro.jsx
import { useCallback, useEffect, useMemo, useState } from 'react';
import "../App.css";
import "../components/event.css";
import EventBar from "../components/EventBar";
import "../components/task.css";
import TaskBox from "../components/TaskBox";


const Pro = () => {
  const initEvent = useMemo(() => [
    {
      title: 'Add a new Event',
      ['To do']: [],
      ['In progress']: [],
      ['Completed']: [],
    },
  ], []);

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('events');
    return saved ? JSON.parse(saved) : initEvent;
  });

  const [currentEvent, setCurrentEvent] = useState(events[0]);

  const updateEvents = useCallback(() => {
    try {
      const dataToSave = events.length ? events : initEvent;
      localStorage.setItem('events', JSON.stringify(dataToSave));
    } catch (e) {
      console.error('Failed to modify events!', e);
    }
  }, [events]);

  useEffect(() => {
    updateEvents();
  }, [events, updateEvents]);

  return (
    <div className="kanban-container">
      <div className="event-bar-wrapper">
        <EventBar
          events={events}
          setEvents={setEvents}
          currentEvent={currentEvent}
          setCurrentEvent={setCurrentEvent}
        />
      </div>
      <div className="task-box-wrapper">
        <TaskBox
          events={events}
          setEvents={setEvents}
          currentEvent={currentEvent}
          setCurrentEvent={setCurrentEvent}
        />
      </div>
    </div>
  );
};

export default Pro;
