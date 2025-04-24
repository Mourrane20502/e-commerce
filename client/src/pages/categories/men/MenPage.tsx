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
}

export default function MenPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Sorting
  const [sort, setSort] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/product");
        const menProducts = res.data.products.filter(
          (product: Product) => product.category?.name?.toLowerCase() === "men"
        );
        setProducts(menProducts);
        setFilteredProducts(menProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const result = [...products];

    if (sort === "lowToHigh") result.sort((a, b) => a.price - b.price);
    if (sort === "highToLow") result.sort((a, b) => b.price - a.price);

    setFilteredProducts(result);
  }, [sort, products]);

  return (
    <div className="mt-20 px-6">
      {/* 🔝 Intro Section */}
      <section className="mb-16 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
          Redefine Your Style
        </h2>
        <p className="text-gray-600 text-lg">
          Elevate your everyday wardrobe with bold, confident, and timeless
          pieces made for men.
        </p>
        <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm transition duration-300">
          Explore New Collection
        </button>
      </section>

      {/* 🎛️ Sort by Price */}
      <div className="mb-10 p-4 bg-blue-50 rounded-xl shadow flex items-center justify-between">
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
      <h1 className="text-3xl font-bold text-center mb-10">Men’s Collection</h1>

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
          No products found in this category.
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
                <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full uppercase font-semibold shadow">
                  {product.category?.name}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h2>
                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                  ★★★★☆ <span className="text-gray-500 ml-1">(18)</span>
                </div>
                <p className="text-blue-600 font-bold text-xl">
                  ${product.price}
                </p>

                <Link key={product._id} to={`/product/${product._id}`}>
                  <button className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium duration-300 hover:bg-blue-700">
                    <FiEye className="text-lg" /> View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔚 Bottom Section */}
      <section className="mt-20 text-center bg-blue-50 py-16 rounded-xl shadow-inner">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          Be Bold. Be Classic.
        </h3>
        <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
          Our mission is to dress men with confidence. Clean cuts, timeless
          colors, crafted for the modern man.
        </p>
        <form className="flex justify-center items-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="py-2 px-4 rounded-full border w-full outline-none"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition duration-300">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
