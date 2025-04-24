import { Link } from "react-router-dom";

interface Category {
  name: string;
  description?: string;
  imageUrl: string;
}

export default function CategoryCard({
  name,
  imageUrl,
  description,
}: Category) {
  return (
    <div
      className="relative group bg-cover bg-center h-[450px] rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="absolute bottom-0 right-0 p-4 text-center z-10">
        <Link to={name.toLowerCase()}>
          <button className="bg-black cursor-pointer text-white px-6 py-2 rounded-lg font-semibold">
            {name}
          </button>
        </Link>
      </div>

      <div className="absolute inset-0 flex justify-center items-start p-6 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-10 transition-all duration-500 ease-in-out">
        <div className="bg-black bg-opacity-60 text-white text-sm p-4 rounded-xl backdrop-blur-md shadow-lg">
          {description || "Discover the latest trends in this category!"}
        </div>
      </div>
    </div>
  );
}
