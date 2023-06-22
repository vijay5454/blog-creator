import { useDispatch, useSelector } from "react-redux";
import { closeCreateModal, closeUpdateModal } from "../feature/modalSlice";
import { useEffect, useState } from "react";
import { useCreateBlog, useUpdateBlog } from "../ReactQueryCusomHook";
import { resetBlogData } from "../feature/eachBlogSlice";

const Modal = () => {
  //State to hold data for Modal
  const [modalData, setModalData] = useState({
    imageURL: "",
    title: "",
    blogContent: "",
  });
  const { imageURL, title, blogContent } = modalData;
  //To know which Modal is opened and set the data if it is Update Modal
  const { createModal, updateModal } = useSelector((state) => {
    return state.modal;
  });
  const {
    imageURL: selectedImgUrl,
    title: selectedTitle,
    blogContent: selectedBlog,
    id: selectedBlogId,
  } = useSelector((state) => {
    return state.blog;
  });
  useEffect(() => {
    if (updateModal) {
      setModalData((prevState) => {
        return {
          ...prevState,
          imageURL: selectedImgUrl,
          title: selectedTitle,
          blogContent: selectedBlog,
        };
      });
    }
  }, [updateModal, selectedImgUrl, selectedTitle, selectedBlog]);
  //Handle Closing the Modal
  const dispatch = useDispatch();
  const handleModal = () => {
    dispatch(closeCreateModal());
    dispatch(closeUpdateModal());
    dispatch(resetBlogData());
  };
  //Handle the Change of Value in the Modal
  const handleChange = (e) => {
    setModalData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  //Handle Submit Form
  const { createBlog } = useCreateBlog();
  const { updateBlog } = useUpdateBlog();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    if (createModal) {
      createBlog(modalData);
    }
    if (updateModal) {
      updateBlog([selectedBlogId, modalData]);
    }
  };
  return (
    <div className="backdrop-blur-md h-screen absolute inset-0">
      <div className="max-w-5xl mx-auto mt-20 p-2 relative">
        <button
          className="absolute -top-1 right-5 md:right-32"
          onClick={handleModal}
        >
          Close
        </button>
        {createModal && <h1 className="text-center text-2xl">Create Blog</h1>}
        {updateModal && <h1 className="text-center text-2xl">Update Blog</h1>}
        <form className="max-w-5xl mx-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Image URL"
            className="block w-[75%] mx-auto mt-5 px-1 py-3 focus:outline-none focus:ring focus:ring-green-300 rounded-md text-black"
            value={imageURL}
            onChange={handleChange}
            name="imageURL"
          />
          <input
            type="text"
            placeholder="Title"
            className="block w-[75%] mx-auto mt-5 px-1 py-3 focus:outline-none focus:ring focus:ring-green-300 rounded-md text-black"
            value={title}
            onChange={handleChange}
            name="title"
          />
          <textarea
            type="text"
            placeholder="Blog Content"
            className="block w-[75%] mx-auto mt-5 px-1 py-3 focus:outline-none focus:ring focus:ring-green-300 rounded-md text-black"
            value={blogContent}
            onChange={handleChange}
            name="blogContent"
          />
          <div className="flex justify-center items-center mt-5">
            <button
              type="submit"
              className="px-5 py-3 bg-white text-black rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
