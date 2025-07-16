import { DragDropContext } from '@hello-pangea/dnd';
import { useCallback, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Column from './Column';

const TaskBox = ({ events, setEvents, currentEvent, setCurrentEvent }) => {
  const [newTasks, setNewTasks] = useState({
    'To do': { name: '', details: '', dueDate: null },
    'In progress': { name: '', details: '', dueDate: null },
    'Completed': { name: '', details: '', dueDate: null },
  });

  const handleRemove = useCallback(() => {
    if (confirm('You really want to remove it?')) {
      setEvents((prev) => {
        const result = prev.filter((item) => item.title !== currentEvent.title);
        if (!result.length) {
          const initEvent = [
            {
              title: 'Add a new Event',
              ['To do']: [],
              ['In progress']: [],
              ['Completed']: [],
            },
          ];
          setEvents(initEvent);
          setCurrentEvent(initEvent[0]);
        } else {
          setCurrentEvent(result[0]);
        }
        return result;
      });
    }
  }, [events, setEvents, currentEvent, setCurrentEvent]);

  const handleDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;
      const { source, destination } = result;
      const taskCopy = { ...currentEvent[source.droppableId][source.index] };

      setEvents((prev) =>
        prev.map((event) => {
          if (event.title === currentEvent.title) {
            const updatedEvent = { ...event };
            updatedEvent[source.droppableId].splice(source.index, 1);
            updatedEvent[destination.droppableId].splice(destination.index, 0, taskCopy);
            return updatedEvent;
          } else return event;
        })
      );
    },
    [events, setEvents, currentEvent]
  );

  const handleAddTask = (tag) => {
    const { name, details, dueDate } = newTasks[tag];
    if (!name) return alert('Task name required');

    const newTask = {
      id: Date.now(),
      name,
      details,
      dueDate,
    };

    const updatedEvents = events.map((event) => {
      if (event.title === currentEvent.title) {
        return {
          ...event,
          [tag]: [...event[tag], newTask],
        };
      }
      return event;
    });

    setEvents(updatedEvents);
    setNewTasks({
      ...newTasks,
      [tag]: { name: '', details: '', dueDate: null },
    });
  };

  return (
    <div className="task-box">
      <header className="task-box-header">
        <h1 className="task-box-title">All Tasks</h1>
        <button className="remove-button" onClick={handleRemove}>
          Remove this Event
        </button>
      </header>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="task-box-body">
          {['To do', 'In progress', 'Completed'].map((tag) => (
            <div key={tag}>
              <Column
                tag={tag}
                events={events}
                setEvents={setEvents}
                currentEvent={currentEvent}
              />

              <div style={{ padding: '10px', marginTop: '10px' }}>
                <input
                  type="text"
                  placeholder="Task name"
                  value={newTasks[tag].name}
                  onChange={(e) =>
                    setNewTasks({ ...newTasks, [tag]: { ...newTasks[tag], name: e.target.value } })
                  }
                  style={{ width: '100%', marginBottom: '5px' }}
                />
                <textarea
                  placeholder="Task details"
                  value={newTasks[tag].details}
                  onChange={(e) =>
                    setNewTasks({
                      ...newTasks,
                      [tag]: { ...newTasks[tag], details: e.target.value },
                    })
                  }
                  style={{ width: '100%', marginBottom: '5px' }}
                />
                <DatePicker
                  selected={newTasks[tag].dueDate}
                  onChange={(date) =>
                    setNewTasks({ ...newTasks, [tag]: { ...newTasks[tag], dueDate: date } })
                  }
                  placeholderText="Due Date"
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  style={{ width: '100%' }}
                />
                <button
                  onClick={() => handleAddTask(tag)}
                  className="add-task-button"
                  style={{ width: '100%', marginTop: '5px' }}
                >
                  + Add Task
                </button>
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBox;
