import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  imageURL: "",
  title: "",
  blogContent: "",
};

const eachBlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    changeBlogData: (state, action) => {
      const { imageURL, title, blogContent, _id } = action.payload;
      state.imageURL = imageURL;
      state.title = title;
      state.blogContent = blogContent;
      state.id = _id;
    },
    resetBlogData: (state) => {
      state.blogContent = "";
      state.title = "";
      state.imageURL = "";
      state.id = null;
    },
  },
});

export default eachBlogSlice.reducer;
export const { changeBlogData, resetBlogData } = eachBlogSlice.actions;
