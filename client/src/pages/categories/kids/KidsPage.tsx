import axios from "axios";
import { useEffect, useState } from "react";
import { FiSmile } from "react-icons/fi";
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

export default function KidsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Sorting
  const [sort, setSort] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/product");
        const kidsProducts = res.data.products.filter(
          (product: Product) => product.category?.name?.toLowerCase() === "kids"
        );
        setProducts(kidsProducts);
        setFilteredProducts(kidsProducts);
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
      <section className="mb-16 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-yellow-600 mb-4 leading-tight">
          Fun, Bright & Comfy!
        </h2>
        <p className="text-gray-600 text-lg">
          Discover vibrant outfits for little adventurers—crafted for comfort
          and made to play!
        </p>
        <button className="mt-6 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full text-sm transition duration-300">
          Shop Kidswear
        </button>
      </section>

      {/* 🎛️ Sort by Price */}
      <div className="mb-10 p-4 bg-yellow-50 rounded-xl shadow flex items-center justify-between">
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
      <h1 className="text-3xl font-bold text-center mb-10 text-yellow-600">
        Kids’ Collection
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-yellow-100 rounded-xl animate-pulse h-[320px]"
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
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h2>
                <p className="text-yellow-600 font-bold text-xl">
                  ${product.price}
                </p>
                <Link key={product._id} to={`/product/${product._id}`}>
                  <button className="mt-4 w-full bg-yellow-400 text-white py-2 rounded-lg text-sm font-medium duration-300 hover:bg-yellow-500">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <section className="mt-20 text-center bg-yellow-50 py-16 rounded-xl shadow-inner">
        <h3 className="text-3xl font-bold text-yellow-700 mb-4">
          Clothes for Little Smiles
        </h3>
        <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
          Because every child deserves to feel comfy, colorful, and cool. New
          drops every week!
        </p>
        <div className="flex justify-center gap-2 items-center text-yellow-600 font-medium text-lg">
          <FiSmile className="text-2xl" />
          Happy Kids, Happy Parents!
        </div>
      </section>
    </div>
  );
}
