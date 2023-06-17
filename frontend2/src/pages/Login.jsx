import { useState } from "react";
import { useLogin } from "../ReactQueryCusomHook";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const { login, isLoading } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(loginForm);
  };
  const handleChange = (e) => {
    setLoginForm((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  return (
    <section className="max-w-3xl mx-auto text-center">
      <h1 className="text-5xl tracking-widest">Login</h1>
      <p className="text-2xl font-light tracking-wide mt-3">
        Please fill the form to login
      </p>
      <form
        className="flex flex-col justify-center items-center gap-3 p-5 max-w-xs mx-auto"
        action="#"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          value={loginForm.email}
          placeholder="Email"
          className="w-full px-1 py-3 rounded-lg focus:outline-none focus:ring focus:ring-green-300 text-black"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={loginForm.password}
          placeholder="Password"
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
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
