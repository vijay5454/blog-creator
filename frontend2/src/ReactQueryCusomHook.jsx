import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveToken } from "./feature/authSlice";

const API_BASE = "http://localhost:5000/api";

//Send the Email and Password and get token
export const useLogin = () => {
  const dispatch = useDispatch();
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
      dispatch(saveToken(data.token));
    },
  });
  return {
    login,
    isError,
    isLoading,
    error,
  };
};
