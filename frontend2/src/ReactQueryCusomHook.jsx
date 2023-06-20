import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveToken } from "./feature/authSlice";
import { useNavigate } from "react-router-dom";

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
