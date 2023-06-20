import { BiEditAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { openUpdateModal } from "../feature/modalSlice";
import { changeBlogData } from "../feature/eachBlogSlice";
const Singleblog = ({ blog }) => {
  const { blogContent, imageURL, title, createdAt } = blog;
  const dispatch = useDispatch();
  const handleUpdateModal = () => {
    dispatch(openUpdateModal());
    dispatch(changeBlogData(blog));
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3 border border-white rounded-lg p-3">
      <div className="w-full flex justify-end">
        <button onClick={handleUpdateModal}>
          <BiEditAlt />
        </button>
      </div>
      <h2 className="text-xl">{title}</h2>
      <p>{blogContent.slice(0, 30)}...</p>
      <p className="font-thin">{createdAt}</p>
    </div>
  );
};

export default Singleblog;
