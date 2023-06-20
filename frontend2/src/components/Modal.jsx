import { useDispatch, useSelector } from "react-redux";
import { closeCreateModal, closeUpdateModal } from "../feature/modalSlice";
import { useEffect, useState } from "react";

const Modal = () => {
  //State to hold data for Modal
  const [modalData, setModalData] = useState({
    imageUrl: "",
    title: "",
    blogContent: "",
  });
  const { imageUrl, title, blogContent } = modalData;
  //To know which Modal is opened and set the data if it is Update Modal
  const { createModal, updateModal } = useSelector((state) => {
    return state.modal;
  });
  const {
    imageURL: blogImgURL,
    title: blogTitle,
    blogContent: selectedBlog,
  } = useSelector((state) => {
    return state.blog;
  });
  useEffect(() => {
    if (updateModal) {
      setModalData((prevState) => {
        return {
          ...prevState,
          imageUrl: blogImgURL,
          title: blogTitle,
          blogContent: selectedBlog,
        };
      });
    }
  }, [updateModal, blogImgURL, blogTitle, selectedBlog]);
  //Handle Opening and Closing the Modal
  const dispatch = useDispatch();
  const handleModal = () => {
    dispatch(closeCreateModal());
    dispatch(closeUpdateModal());
  };
  //Handle the Change of Value in the Modal
  const handleChange = (e) => {
    setModalData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="backdrop-blur-md h-screen absolute inset-0">
      <div className="max-w-3xl mx-auto mt-20 p-2 relative">
        <button
          className="absolute -top-1 right-5 md:right-32"
          onClick={handleModal}
        >
          Close
        </button>
        {createModal && <h1 className="text-center text-2xl">Create Blog</h1>}
        {updateModal && <h1 className="text-center text-2xl">Update Blog</h1>}
        <form className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Image URL"
            className="block w-[75%] mx-auto mt-5 px-1 py-3 focus:outline-none focus:ring focus:ring-green-300 rounded-lg text-black"
            value={imageUrl}
            onChange={handleChange}
            name="imageUrl"
          />
          <input
            type="text"
            placeholder="Title"
            className="block w-[75%] mx-auto mt-5 px-1 py-3 focus:outline-none focus:ring focus:ring-green-300 rounded-lg text-black"
            value={title}
            onChange={handleChange}
            name="title"
          />
          <textarea
            type="text"
            placeholder="Blog Content"
            className="block w-[75%] mx-auto mt-5 px-1 py-3 focus:outline-none focus:ring focus:ring-green-300 rounded-lg text-black"
            value={blogContent}
            onChange={handleChange}
            name="blogContent"
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
