import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

const CategoryColumn = ({ category, tasks, moveTask }) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item) => moveTask(item.taskId, category.value),
  });

  const filteredTasks = tasks.filter(
    (task) => task.category === category.value
  );

  return (
    <div ref={drop} className={`p-4 ${category.color} rounded-md`}>
      <h2 className="font-bold text-lg">{category.name}</h2>
      {filteredTasks.length === 0 ? (
        <p>No tasks in this category</p>
      ) : (
        filteredTasks.map((task) => <TaskCard key={task._id} task={task} />)
      )}
    </div>
  );
};

export default CategoryColumn;
