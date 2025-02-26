import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://task-management-server-plum-nine.vercel.app",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
