import axios from "axios";
import { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: {
    name: string;
  };
  rating?: number;
}

export default function WomenPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [sort, setSort] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/product");
        const womenProducts = res.data.products.filter(
          (product: Product) =>
            product.category?.name?.toLowerCase() === "women"
        );
        setProducts(womenProducts);
        setFilteredProducts(womenProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply sorting
  useEffect(() => {
    const result = [...products];

    if (sort === "lowToHigh") result.sort((a, b) => a.price - b.price);
    if (sort === "highToLow") result.sort((a, b) => b.price - a.price);

    setFilteredProducts(result);
  }, [sort, products]);

  return (
    <div className="mt-20 px-6">
      <section className="mb-16 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
          Discover Elegance & Style
        </h2>
        <p className="text-gray-600 text-lg">
          Unveil the latest trends designed for modern women. From casual chic
          to elegant evenings, we’ve got you covered.
        </p>
        <button className="mt-6 px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-full text-sm transition duration-300">
          Shop New Arrivals
        </button>
      </section>

      <div className="mb-10 p-4 bg-white  border-black/20 rounded-xl shadow-sm flex items-center justify-between">
        <div className="text-sm text-gray-700">Sort By:</div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-2 py-1 rounded border"
        >
          <option value="default">Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {/* 🛍️ Product Section */}
      <h1 className="text-3xl font-bold text-center mb-10">
        Women’s Collection
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-xl animate-pulse h-[320px]"
            ></div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          No products match the selected filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 relative"
            >
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs px-2 py-1 rounded-full uppercase font-semibold shadow">
                  {product.category?.name}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h2>
                <p className="text-pink-600 font-bold text-xl">
                  ${product.price}
                </p>
                <Link key={product._id} to={`/product/${product._id}`}>
                  <button className="mt-4 w-full flex items-center justify-center gap-2 bg-pink-500 text-white py-2 rounded-lg text-sm font-medium duration-300 hover:bg-pink-600">
                    <FiEye className="text-lg" /> View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <section className="mt-20 text-center bg-pink-50 py-16 rounded-xl shadow-inner">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          Feel Confident. Be You.
        </h3>
        <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
          Every piece in our collection is handpicked to empower, inspire and
          celebrate individuality. Join the movement.
        </p>
        <form className="flex justify-center items-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="py-2 px-4 rounded-full border w-full outline-none"
          />
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full transition duration-300">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
