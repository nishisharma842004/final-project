const Task = ({
  name,
  details,
  id,
  dueDate,
  provided,
  handleUpdate,
  handleRemove,
}) => {
  // Check if the task is overdue (due date is before today's date)
  const isOverdue =
    dueDate && new Date(dueDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);

  return (
    <div
      className="task"
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      onClick={() => handleUpdate(id)}
    >
      <h2 className="task-name over-hide">{name}</h2>
      <p className="task-details">{details}</p>

      {/* Due Date Display */}
      {dueDate && (
        <p
          className="task-due-date"
          style={{
            color: isOverdue ? "red" : "green",
            fontSize: "0.85rem",
            marginTop: "6px",
            fontWeight: "500",
          }}
        >
          Due: {new Date(dueDate).toLocaleDateString()}
        </p>
      )}

      {/* Remove button */}
      <div
        className="remove-bar"
        onClick={(e) => {
          e.stopPropagation(); // Prevent opening update modal on delete
          handleRemove(id, e);
        }}
      >
        -
      </div>
    </div>
  );
};

export default Task;
