import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { openUpdateModal } from "../feature/modalSlice";
import { changeBlogData } from "../feature/eachBlogSlice";
import { useDeleteBlog } from "../ReactQueryCusomHook";
const Singleblog = ({ blog }) => {
  const { blogContent, imageURL, title, createdAt, _id } = blog;
  const dispatch = useDispatch();
  const { deleteBlog } = useDeleteBlog();
  const handleEdit = () => {
    dispatch(openUpdateModal());
    dispatch(changeBlogData(blog));
  };
  const handleDelete = () => {
    deleteBlog(_id);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2 border border-white rounded-lg p-3">
      <div className="w-full flex justify-end gap-4">
        <button onClick={handleEdit}>
          <BiEditAlt />
        </button>
        <button onClick={handleDelete}>
          <AiOutlineDelete />
        </button>
      </div>
      <h2 className="text-xl">{title}</h2>
      <p>{blogContent.slice(0, 30)}...</p>
      <p className="font-thin">{createdAt}</p>
    </div>
  );
};

export default Singleblog;
