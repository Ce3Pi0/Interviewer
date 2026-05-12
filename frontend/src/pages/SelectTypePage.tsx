import Navbar from "../components/Navbar";
import { userStore } from "../hooks/fetchUsers";

const SelectTypePage = () => {
  const { selectUserType } = userStore();

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 flex flex-col gap-10 items-center justify-center h-[80vh]">
        <span className="font-black text-5xl bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
          Select What You Are:
        </span>
        <div className="flex items-center justify-center w-full gap-40">
          <button
            className="btn btn-success text-xl p-6 hover:scale-105 transition-transform duration-100"
            onClick={() => selectUserType("interviewer")}
          >
            Interviewer
          </button>
          <button
            className="btn btn-info text-xl p-6 hover:scale-105 transition-transform duration-100"
            onClick={() => selectUserType("interviewee")}
          >
            Interviewee
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectTypePage;
