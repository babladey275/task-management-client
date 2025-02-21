import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import GoogleLogin from "../Shared/SocialLogin/GoogleLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);

        Swal.fire({
          title: "User login successful!",
          showClass: {
            popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
          },
          hideClass: {
            popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
          },
        });
        navigate("/");
      })
      .catch((error) => {
        toast.error(`Login failed: ${error.message}`);
      });
  };
  return (
    <div className="hero min-h-screen">
      <div className="w-full max-w-lg p-8 my-8 md:p-12 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Login your account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <label className="fieldset-label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className="input w-full"
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
            })}
            placeholder="Enter your password"
            className="w-full input"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500 mt-1">Password is required</p>
          )}

          <button type="submit" className="w-full btn btn-neutral">
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already registered?{" "}
            <Link to="/register" className="font-bold hover:underline">
              Go to Sign Up
            </Link>
          </p>
          <div className="divider my-4">Or Login with</div>
          <div className="mt-4">
            <GoogleLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
