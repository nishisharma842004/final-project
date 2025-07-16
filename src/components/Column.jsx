import { Draggable, Droppable } from '@hello-pangea/dnd';
import uuid from 'react-uuid';
import AddTaskButton from './AddTaskButton';
import Task from './Task';

const Column = ({ tag, currentEvent, events, setEvents }) => {
  const handleAdd = (taskData) => {
    if (!(taskData.name && taskData.details)) return;

    setEvents((prev) => {
      const arrCopy = [...prev];
      const index = prev.findIndex(
        (event) => event.title === currentEvent.title
      );
      const eventCopy = arrCopy[index];

      const newTask = {
        id: uuid(),
        name: taskData.name,
        details: taskData.details,
        dueDate: taskData.dueDate || null,
      };

      // Replace old event with updated tasks
      arrCopy.splice(index, 1, {
        ...eventCopy,
        [tag]: [...eventCopy[tag], newTask],
      });

      return arrCopy;
    });
  };

  const handleRemove = (id, e) => {
    e.stopPropagation();
    setEvents((prev) =>
      prev.map((event) => {
        if (event.title === currentEvent.title) {
          const taskList = event[tag].filter((item) => item.id !== id);
          return { ...event, [tag]: taskList };
        } else {
          return event;
        }
      })
    );
  };

  const handleUpdate = (id) => {
    const name = prompt('Update task name:');
    const details = prompt('Update details:');
    if (!(name && details)) return;

    setEvents((prev) =>
      prev.map((event) => {
        if (event.title === currentEvent.title) {
          const taskList = event[tag].map((item) =>
            item.id === id ? { ...item, name, details } : item
          );
          return { ...event, [tag]: taskList };
        } else {
          return event;
        }
      })
    );
  };

  return (
    <div className="column">
      {tag}
      <AddTaskButton onAdd={handleAdd} /> {/* ✅ Updated prop */}
      <Droppable droppableId={tag}>
        {(provided, snapshot) => (
          <div
            className="task-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {events
              .find((event) => event.title === currentEvent.title)
              ?.[tag].map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <Task
                      name={item.name}
                      details={item.details}
                      dueDate={item.dueDate} // ✅ Now passed
                      id={item.id}
                      provided={provided}
                      snapshot={snapshot}
                      handleRemove={handleRemove}
                      handleUpdate={handleUpdate}
                    />
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
