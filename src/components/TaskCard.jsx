import { useDrag } from "react-dnd";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { format } from "date-fns";

const TaskCard = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { taskId: task._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const formattedTimestamp = format(
    new Date(task.timestamp),
    "MMM dd, yyyy HH:mm"
  );

  return (
    <div
      ref={drag}
      className={`mb-4 p-4 bg-white rounded-lg shadow-sm ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <p className="font-semibold">{task.title}</p>
      <p>{task.description}</p>
      <p className="text-sm text-gray-500">{formattedTimestamp}</p>
      {/* Buttons Edit & Delete */}
      <div className="flex gap-2 mt-2">
        <button className="text-blue-500">
          <FiEdit />
        </button>
        <button className="text-red-500">
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
