import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateModal = ({ closeModal, task }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    // console.log(data);
    const updatedTask = {
      title: data.title,
      description: data.description,
      timestamp: new Date().toISOString(),
    };
    const res = await axiosSecure.patch(`/tasks/${task._id}`, updatedTask);
    // console.log(res);
    if (res.data.modifiedCount > 0) {
      closeModal();
      Swal.fire({
        position: "top",
        icon: "success",
        title: `${data.title} is updated to the task.`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-70 flex justify-center items-center overflow-auto">
      <div className="bg-white rounded-lg p-8 max-w-3xl w-full sm:w-120 max-h-[90vh] flex flex-col">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
          Update your Task
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto"
        >
          {/* Title Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              defaultValue={task.title}
              {...register("title", {
                required: "Title is required",
                maxLength: {
                  value: 50,
                  message: "Title cannot be longer than 50 characters",
                },
              })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Enter title (max 50 characters)"
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              defaultValue={task.description}
              {...register("description", {
                maxLength: {
                  value: 200,
                  message: "Description cannot be longer than 200 characters",
                },
              })}
              className="mt-1 p-2 w-full h-32 border border-gray-300 rounded-md"
              placeholder="Write a brief description (max 200 characters)"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-error text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
