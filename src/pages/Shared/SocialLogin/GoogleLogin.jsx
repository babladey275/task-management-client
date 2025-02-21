import { FaGoogle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router";

const GoogleLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post("users", userInfo).then((res) => {
        console.log(res);
        navigate("/");
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
