import { useRegister } from "../ReactQueryCusomHook";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
const Register = () => {
  //Custom hook used to login user
  const { register, isLoading, isError, error } = useRegister();

  //State and handling functions to handle Form
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error("Password doesn't match");
    } else {
      register(registerForm);
    }
  };
  const handleChange = (e) => {
    setRegisterForm((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  //Toastify the Error
  useEffect(() => {
    if (isError) {
      toast.error(error.response.data.message);
    }
  }, [error, isError]);

  //Checking for authenticated user
  const { user } = useSelector((state) => {
    return state.auth;
  });
  if (user !== null) {
    return <Navigate to="/" />;
  }

  return (
    <section className="max-w-3xl mx-auto text-center mt-20">
      <h1 className="text-5xl tracking-widest">Register</h1>
      <p className="text-2xl font-light tracking-wide mt-3">
        Please fill the form to register
      </p>
      <form
        className="flex flex-col justify-center items-center gap-3 p-5 max-w-xs mx-auto"
        action="#"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          value={registerForm.name}
          placeholder="Name"
          className="w-full px-1 py-3 rounded-lg focus:outline-none focus:ring focus:ring-green-300 text-black"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={registerForm.email}
          placeholder="Email"
          className="w-full px-1 py-3 rounded-lg focus:outline-none focus:ring focus:ring-green-300 text-black"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={registerForm.password}
          placeholder="Password"
          className="w-full px-1 py-3 rounded-lg focus:outline-none focus:ring focus:ring-green-300 text-black"
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          value={registerForm.confirmPassword}
          placeholder="Confirm Password"
          className="w-full px-1 py-3 rounded-lg focus:outline-none focus:ring focus:ring-green-300 text-black"
          onChange={handleChange}
        />
        <button
          type="submit"
          className={`px-8 py-3 rounded-lg border border-white ${
            isLoading && "bg-gray-500 hover:bg-gray-500 hover:text-white"
          }`}
          disabled={isLoading}
        >
          Register
        </button>
      </form>
    </section>
  );
};

export default Register;
