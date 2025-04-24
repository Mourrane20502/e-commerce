import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiEye, FiHeart, FiShoppingCart } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: {
    name: string;
  };
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/product/${id}`);
        setProduct(res.data.product);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setError(
          "Sorry, we couldn't load the product details. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="mt-20 px-6 grid place-items-center">
        <div className="animate-pulse space-y-4">
          <div className="h-72 bg-gray-200 rounded-lg w-full"></div>
          <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 px-6 text-center text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mt-20 px-6 text-center text-red-500 font-semibold">
        Product not found
      </div>
    );
  }

  return (
    <div className="mt-20 px-6 max-w-screen-xl mx-auto">
      <div className="mb-6 text-gray-600">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>{" "}
        /<span className="text-gray-500">{product.category.name}</span> /
        <span className="text-gray-500">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[450px] object-cover rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div>
          <h2 className="text-4xl font-extrabold text-gray-800">
            {product.name}
          </h2>
          <div className="flex items-center gap-2 text-yellow-400 mt-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < 4 ? "text-yellow-500" : "text-gray-300"}
              />
            ))}
            <span className="text-gray-500 text-sm">(18 reviews)</span>
          </div>
          <p className="text-lg text-gray-600 mt-2">{product.category.name}</p>
          <p className="text-blue-600 font-bold text-3xl mt-4">
            ${product.price}
          </p>

          <p className="text-gray-700 text-lg mt-6">{product.description}</p>

          <div className="mt-8 flex gap-6">
            <button
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm transition duration-300"
              onClick={() => alert("Add to Cart functionality coming soon!")}
            >
              <FiShoppingCart className="text-lg" /> Add to Cart
            </button>
            <button
              className="flex items-center gap-2 px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full text-sm transition duration-300"
              onClick={() => alert("Wishlist functionality coming soon!")}
            >
              <FiHeart className="text-lg" /> Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold text-gray-800">Product Details</h3>
        <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
          {product.description}
        </p>
      </div>

      <div className="mt-16 text-center">
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-gray-800 text-white rounded-full text-sm transition duration-300 hover:bg-gray-700"
        >
          <FiEye className="inline-block mr-2" /> Back to Products
        </button>
      </div>
    </div>
  );
}
