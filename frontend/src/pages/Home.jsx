import blogTempData from "../data";
import BlogCard from "../components/BlogCard";

const Home = () => {
  return (
    <section className="max-w-3xl mx-auto mt-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogTempData.map((eachBlog) => {
          return <BlogCard key={eachBlog.id} blog={eachBlog} />;
        })}
      </div>
    </section>
  );
};

export default Home;
