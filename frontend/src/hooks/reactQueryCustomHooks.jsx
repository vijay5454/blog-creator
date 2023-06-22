import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchBlogs = () => {
  const API_URL = "https://blog-server-6bh5.onrender.com/api/blogs/all/";
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data;
    },
  });
  return { data, isError, isLoading, error };
};

export const useFetchSingleBlog = (id) => {
  const API_URL = `https://blog-server-6bh5.onrender.com/api/blogs/all/${id}`;

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["eachBlog"],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data;
    },
  });
  return {
    data,
    isError,
    isLoading,
    error,
  };
};
