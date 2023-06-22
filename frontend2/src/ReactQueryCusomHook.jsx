import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveToken } from "./feature/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { closeCreateModal } from "./feature/modalSlice";
import { closeUpdateModal } from "./feature/modalSlice";

const API_BASE = "http://localhost:5000/api";

//Used to Login the User
export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    mutate: login,
    isError,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async (requestPayload) => {
      const response = await axios.post(
        API_BASE + "/users/login",
        requestPayload
      );
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data.token));
      localStorage.setItem("name", JSON.stringify(data.name));
      //Save token using redux dispatch function
      dispatch(saveToken(data.token));
      navigate("/");
    },
  });
  return {
    login,
    isError,
    isLoading,
    error,
  };
};

//Used to Register the User
export const useRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    mutate: register,
    isError,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async (requestPayload) => {
      const response = await axios.post(API_BASE + "/users", requestPayload);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data.token));
      //Save token using redux dispatch function
      dispatch(saveToken(data.token));
      navigate("/");
    },
  });
  return {
    register,
    isError,
    isLoading,
    error,
  };
};

//Used to get Personal Blogs
export const useGetPersonalBlogs = () => {
  const { user } = useSelector((state) => {
    return state.auth;
  });
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["FetchPersonalBlogs"],
    queryFn: async () => {
      const response = await axios.get(API_BASE + "/blogs/me", {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
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

//Used to Create the Blog
export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return state.auth;
  });
  const {
    mutate: createBlog,
    error,
    isError,
    isLoading,
  } = useMutation({
    mutationFn: async (requestPayload) => {
      const response = await axios.post(
        API_BASE + "/blogs/create",
        requestPayload,
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FetchPersonalBlogs"],
      });
      dispatch(closeCreateModal());
      toast.info("Creation of Blog is Successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {
    createBlog,
    error,
    isError,
    isLoading,
  };
};

//Used to Update Blog
export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return state.auth;
  });
  const {
    mutate: updateBlog,
    error,
    isError,
    isLoading,
  } = useMutation({
    mutationFn: async ([id, requestPayload]) => {
      const response = await axios.post(
        API_BASE + "/blogs/" + id,
        requestPayload,
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FetchPersonalBlogs"],
      });
      dispatch(closeUpdateModal());
      toast.info("Update Successful!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {
    updateBlog,
    error,
    isError,
    isLoading,
  };
};

//Used to Delete Blog
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => {
    return state.auth;
  });
  const {
    mutate: deleteBlog,
    error,
    isError,
    isLoading,
  } = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(API_BASE + "/blogs/" + id, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FetchPersonalBlogs"],
      });
      toast.info("Blog deleted Successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {
    deleteBlog,
    error,
    isError,
    isLoading,
  };
};
