import blogTempData from "../data";
import { useParams } from "react-router-dom";

const SingleBlog = () => {
  const { id } = useParams();
  const clickedBlog = blogTempData.find((eachBlog) => {
    return eachBlog.id === parseInt(id);
  });
  console.log(clickedBlog);
  return (
    <div className="max-w-3xl mx-auto text-center mt-10 font-serif flex flex-col">
      <div className="flex justify-center items-center mb-5">
        <img
          src={clickedBlog.imageURL}
          alt="Blog image"
          className="w-32 object-cover md:w-44"
        />
      </div>
      <h1 className="text-3xl mb-2">{clickedBlog.title}</h1>
      <p className="text-xl">{clickedBlog.blogContent}</p>
      <p className="text-xl mt-1">By {clickedBlog.author}</p>
    </div>
  );
};

export default SingleBlog;
