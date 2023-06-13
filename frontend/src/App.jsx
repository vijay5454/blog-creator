import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SingleBlog from "./components/SingleBlog";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<SingleBlog />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}

export default App;
