import { useParams } from "react-router-dom";
import { useFetchSingleBlog } from "../hooks/reactQueryCustomHooks";

const SingleBlog = () => {
  const { id } = useParams();
  const { data, isError, isLoading, error } = useFetchSingleBlog(id);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center fixed inset-0 z-50">
        <div className="w-10 h-10 border-t-2 border-white rounded-full animate-spin duration-200"></div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-2xl">{error.message}</h1>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto text-center mt-10 font-serif flex flex-col">
      <div className="flex justify-center items-center mb-5">
        <img
          src={data.imageURL}
          alt="Blog image"
          className="w-32 object-cover md:w-44"
        />
      </div>
      <h1 className="text-3xl mb-2">{data.title}</h1>
      <p className="text-xl">{data.blogContent}</p>
      <p className="text-xl mt-1">By {data.author}</p>
    </div>
  );
};

export default SingleBlog;
