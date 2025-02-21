import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router";
import GoogleLogin from "../Shared/SocialLogin/GoogleLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);

        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            // create user entry in the database
            const userInfo = {
              name: data.name,
              email: data.email,
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                reset();
                Swal.fire({
                  icon: "success",
                  title: "Registration Successful!",
                  text: "You have successfully registered!",
                  confirmButtonText: "OK",
                }).then(() => {
                  navigate("/");
                });
              }
            });
          })
          .catch((error) => {
            toast.error(`Profile update failed: ${error.message}`);
          });
      })
      .catch((error) => {
        toast.error(`Registration failed: ${error.message}`);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg p-8 my-8 md:p-12 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}

          <label className="fieldset-label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Enter your name"
            className="w-full input input-bordered"
          />
          {errors.name && (
            <span className="text-red-500 mt-1">Name is required</span>
          )}

          {/* Photo URL Field */}

          <label className="fieldset-label">Photo URL</label>
          <input
            type="url"
            {...register("photoURL", { required: true })}
            placeholder="Enter your photo URL"
            className="w-full input input-bordered"
          />
          {errors.photoURL && (
            <span className="text-red-500 mt-1">Photo URL is required</span>
          )}

          {/* Email Field */}

          <label className="fieldset-label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className="w-full input input-bordered"
          />
          {errors.email && (
            <span className="text-red-500 mt-1">Email is required</span>
          )}

          {/* Password Field */}

          <label className="fieldset-label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 20,
              pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$&*])/,
            })}
            name="password"
            placeholder="Enter your password"
            className="w-full input input-bordered"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500 mt-1">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500 mt-1">
              Password must be at least 6 characters
            </p>
          )}
          {errors.password?.type === "maxLength" && (
            <p className="text-red-500 mt-1">
              Password must be less than 20 characters
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500 mt-1">
              Password must include one uppercase letter, one lowercase letter,
              one number, and one special character.
            </p>
          )}

          <button type="submit" className="w-full btn btn-neutral">
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already registered?{" "}
            <Link to="/login" className="font-bold hover:underline">
              Go to Login
            </Link>
          </p>
          <div className="divider my-4">Or sign up with</div>
          <div className="mt-4">
            <GoogleLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
