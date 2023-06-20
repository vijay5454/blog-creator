import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageURL: "",
  title: "",
  blogContent: "",
};

const eachBlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    changeBlogData: (state, action) => {
      const { imageURL, title, blogContent } = action.payload;
      state.imageURL = imageURL;
      state.title = title;
      state.blogContent = blogContent;
    },
  },
});

export default eachBlogSlice.reducer;
export const { changeBlogData } = eachBlogSlice.actions;
