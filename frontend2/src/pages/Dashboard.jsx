import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useGetPersonalBlogs } from "../ReactQueryCusomHook";
import Singleblog from "../components/Singleblog";
import { openCreateModal } from "../feature/modalSlice";
import Modal from "../components/Modal";

const Dashboard = () => {
  //Query for getting personal blogs
  const { data, isLoading } = useGetPersonalBlogs();
  //Handle Create Modal
  const { createModal, updateModal } = useSelector((state) => {
    return state.modal;
  });
  const dispatch = useDispatch();
  const handleCreateButton = () => {
    dispatch(openCreateModal());
  };
  //Checking for authenticated user
  const { user } = useSelector((state) => {
    return state.auth;
  });
  if (user === null) {
    return <Navigate to="/login" />;
  }
  //Loading State for getting Blogs
  if (isLoading) {
    return (
      <section className="max-w-3xl text-center mx-auto mt-20">
        <p className="text-2xl">Loading..</p>
      </section>
    );
  }
  const name = JSON.parse(localStorage.getItem("name"));
  //Conditional Check to open Modal
  return createModal || updateModal ? (
    <Modal />
  ) : (
    <section className="max-w-3xl text-center mx-auto mt-12">
      <h1 className="text-4xl">Welcome {name}</h1>
      {data.length === 0 ? (
        <p className="text-xl mt-3">No Blogs found. Create one please.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-5">
          {data.map((eachBlog) => {
            return <Singleblog key={eachBlog._id} blog={eachBlog} />;
          })}
        </div>
      )}
      <button
        className="px-2 py-3 bg-white text-black rounded-lg mt-3"
        onClick={handleCreateButton}
      >
        Create Blog
      </button>
    </section>
  );
};

export default Dashboard;
