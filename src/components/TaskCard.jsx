import { useDrag } from "react-dnd";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { format } from "date-fns";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useState } from "react";
import UpdateModal from "./UpdateModal";

const TaskCard = ({ task, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/tasks/${id}`);

        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const closeModal = () => {
    refetch();
    setIsModalOpen(false);
  };

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
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-blue-500 cursor-pointer mr-1"
        >
          <FiEdit />
        </button>
        <button
          onClick={() => handleDelete(task._id)}
          className="text-red-500 cursor-pointer"
        >
          <FiTrash2 />
        </button>
      </div>
      {isModalOpen && <UpdateModal closeModal={closeModal} task={task} />}
    </div>
  );
};

export default TaskCard;
