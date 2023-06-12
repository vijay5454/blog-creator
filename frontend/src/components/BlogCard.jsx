import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { id, imageURL, title, author, blogContent } = blog;
  return (
    <div className="rounded-lg border-2 border-white flex flex-col gap-2 items-center justify-center font-serif px-3">
      <h1 className="text-2xl">{title}</h1>
      <p>
        {blogContent.slice(0, 80)}...
        <Link className="font-light text-gray-400 inline-block" to={`/${id}`}>
          Read More
        </Link>
      </p>
      <p>By {author}</p>
    </div>
  );
};

export default BlogCard;
