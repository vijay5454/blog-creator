import BlogCard from "../components/BlogCard";
import { toast } from "react-toastify";
import { useFetchBlogs } from "../hooks/reactQueryCustomHooks";

const Home = () => {
  const { isError, isLoading, data, error } = useFetchBlogs();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center fixed inset-0 z-50">
        <div className="w-10 h-10 border-t-2 border-white rounded-full animate-spin duration-200"></div>
      </div>
    );
  }
  if (isError) {
    toast.error(error.message);
    return (
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-2xl">{error.message}</h1>
      </div>
    );
  }
  return (
    <section className="max-w-3xl mx-auto mt-14">
      <div
        className={
          data.length === 0
            ? "text-center text-2xl"
            : "grid grid-cols-1 md:grid-cols-3 gap-8"
        }
      >
        {data.length === 0 ? (
          <p>Sorry, No Blogs Found</p>
        ) : (
          data.map((eachBlog) => {
            return <BlogCard key={eachBlog._id} blog={eachBlog} />;
          })
        )}
      </div>
    </section>
  );
};

export default Home;
