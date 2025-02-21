import { Outlet } from "react-router";

const Root = () => {
  return (
    <div className="bg-gray-100">
      <Outlet />
    </div>
  );
};

export default Root;
