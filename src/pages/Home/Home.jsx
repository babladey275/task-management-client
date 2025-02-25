import Navbar from "../Shared/Navbar/Navbar";
import TaskBoard from "./TaskBoard";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <header>
        <Navbar />
      </header>
      <main>
        <TaskBoard />
      </main>
    </div>
  );
};

export default Home;
