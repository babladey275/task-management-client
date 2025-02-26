import { FaGoogle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const GoogleLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosSecure.post("users", userInfo).then((res) => {
        // console.log(res);
        navigate("/home");
      });
    });
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">
        <FaGoogle /> Google
      </button>
    </div>
  );
};

export default GoogleLogin;
