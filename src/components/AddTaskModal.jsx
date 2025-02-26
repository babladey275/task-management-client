import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const AddTaskModal = ({ closeModal }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);

    const task = {
      email: user?.email,
      title: data.title,
      description: data.description,
      timestamp: new Date().toISOString(),
      category: "todo",
    };
    const res = await axiosSecure.post("/tasks", task);
    // console.log(res.data);
    if (res.data.insertedId) {
      Swal.fire({
        title: "Success!",
        text: "Your task has been added.",
        icon: "success",
        confirmButtonText: "OK",
      });
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-70 flex justify-center items-center overflow-auto">
      <div className="bg-white rounded-lg p-8 max-w-3xl w-full sm:w-120 max-h-[90vh] flex flex-col">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
          Add your Task
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
