import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CategoryColumn from "../../components/CategoryColumn";
import AddTaskModal from "../../components/AddTaskModal";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TaskBoard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: tasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/tasks/${user.email}`);
        console.log(res.data);
        return res.data;
      }
    },
    enabled: !!user?.email,
  });

  const [tasksState, setTasksState] = useState(tasks);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (tasks.length !== tasksState.length) {
      setTasksState(tasks);
    }
  }, [tasks, tasksState]);

  const addTask = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    refetch();
  };

  // Move Task function with optimistic UI update
  const moveTask = async (taskId, categoryValue) => {
    const updatedTasks = tasksState.map((task) =>
      task._id === taskId
        ? {
            ...task,
            category: categoryValue,
            timestamp: new Date().toISOString(),
          }
        : task
    );

    setTasksState(updatedTasks);

    try {
      await axiosSecure.put(`/tasks/${taskId}/move`, {
        category: categoryValue,
        timestamp: new Date().toISOString(),
      });
      refetch();
    } catch (error) {
      console.error("Error moving task:", error);
      setTasksState(tasks);
    }
  };

  const categories = [
    { name: "To Do", value: "todo", color: "bg-red-100" },
    { name: "In Progress", value: "inprogress", color: "bg-yellow-100" },
    { name: "Done", value: "done", color: "bg-green-100" },
  ];

  const tasksByCategory = categories.reduce((acc, category) => {
    acc[category.value] = tasksState.filter(
      (task) => task.category === category.value
    );
    return acc;
  }, {});

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-7xl mx-auto p-6">
        <button
          className="bg-black text-white px-5 py-2 rounded-lg mb-6 hover:bg-gray-800"
          onClick={addTask}
        >
          + Add Task
        </button>
        {isLoading ? (
          <div className="flex justify-center items-center my-12">
            <span className="loading loading-bars loading-xl"></span>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryColumn
                key={category.value}
                category={category}
                tasks={tasksByCategory[category.value]}
                moveTask={moveTask}
                refetch={refetch}
              />
            ))}
          </div>
        )}

        {/* modal */}
        {isModalOpen && <AddTaskModal closeModal={closeModal} />}
      </div>
    </DndProvider>
  );
};

export default TaskBoard;
