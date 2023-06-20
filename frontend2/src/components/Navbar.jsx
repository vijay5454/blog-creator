import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../feature/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return state.auth;
  });
  const handleButton = () => {
    navigate("/login");
    dispatch(logout());
  };
  return (
    <nav className="max-w-3xl mx-auto flex justify-between p-5">
      <h1 className="text-2xl">Blog Creator</h1>
      <div className="flex justify-center items-center gap-2">
        {user === null ? (
          <>
            <Link
              className="px-8 py-3 bg-white text-black rounded-lg"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="px-8 py-3 bg-white text-black rounded-lg"
              to="/register"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            className="px-8 py-3 bg-white text-black rounded-lg"
            onClick={handleButton}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
