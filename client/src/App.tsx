import axios from "axios";
import { Star, StarsIcon } from "lucide-react";
import { useEffect, useState } from "react";
import CategoryCard from "./components/CategoryCard";
import Footer from "./components/navigation/Footer";
import HomeSectionImage from "./images/couple-winter-cloths-studio.jpg";

interface Category {
  name: string;
  description: string;
  imageUrl: string;
}

function App() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <section
        className="relative w-full h-[700px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${HomeSectionImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 opacity-50 bg-black"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-start h-full px-6 md:px-16 gap-4">
          <h1 className="text-gray-300 text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
            Elevate Your Style with Confidence
          </h1>
          <p className="text-gray-400 text-base md:text-lg mt-2 max-w-xl drop-shadow-sm">
            Explore our curated collection of contemporary fashion and timeless
            accessories — crafted to inspire and designed to impress.
          </p>
          <button className="bg-red-700 cursor-pointer hover:bg-red-600 transition-all duration-300 px-8 py-3 text-white mt-4 rounded-xl text-lg font-semibold flex items-center gap-2 group">
            <span>Shop the Collection</span>
            <svg
              className="w-5 h-5 transform group-hover:-scale-x-125 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </section>

      <section className="mt-10">
        <div className="text-center text-2xl font-normal text-gray-800">
          <h2>Find Your Look</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 px-6 md:px-16">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </section>
      <section className="bg-gray-100 py-16 mt-16 px-6 md:px-0">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Stay in the loop
          </h2>
          <p className="text-gray-600 mb-6">
            Get updates on new collections, exclusive offers, and fashion tips.
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-[300px] px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button className="bg-red-700 hover:bg-red-600 transition-all text-white px-6 py-2 rounded-lg font-semibold">
              Subscribe
            </button>
          </form>
        </div>
      </section>
      <section className="bg-gray-50 py-16 px-6 md:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Why Shop With Us?
          </h2>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            Your experience matters. Here's what makes us different.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Free Shipping",
              desc: "On all orders over $50.",
              icon: "🚚",
            },
            {
              title: "24/7 Support",
              desc: "Always available for you.",
              icon: "💬",
            },
            {
              title: "Easy Returns",
              desc: "30-day hassle-free returns.",
              icon: "🔄",
            },
            {
              title: "Premium Quality",
              desc: "Only top-tier materials.",
              icon: "✨",
            },
          ].map(({ title, desc, icon }, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all"
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h4 className="text-xl font-semibold mb-2 text-gray-800">
                {title}
              </h4>
              <p className="text-gray-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            Real stories from real customers. See what people love about our
            products.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Emily R.",
              review:
                "Absolutely love the quality! The fit is perfect and I got so many compliments. Will shop again!",
              img: "https://randomuser.me/api/portraits/women/68.jpg",
            },
            {
              name: "Jason M.",
              review:
                "Fast delivery and the clothes exceeded expectations. Super comfy and stylish!",
              img: "https://randomuser.me/api/portraits/men/44.jpg",
            },
            {
              name: "Sophie L.",
              review:
                "Such a great experience. I love how the styles match the latest trends. Highly recommend!",
              img: "https://randomuser.me/api/portraits/women/22.jpg",
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.img}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <h4 className="text-lg font-semibold text-gray-800">
                  {testimonial.name}
                </h4>
              </div>
              <p className="text-gray-600 text-sm">{testimonial.review}</p>
              <div className="flex items-center gap-1.5 mt-4">
                {[...Array(5)].map((_, starIdx) => (
                  <Star
                    key={starIdx}
                    className="w-5 h-5 text-yellow-500 inline-block"
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-white py-20 px-6 md:px-0">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Questions? We're here to help.
            </h3>
            <p className="text-gray-600 mb-6">
              Reach out to our customer support for assistance with your orders,
              product questions, or styling advice.
            </p>
            <button className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-all">
              Contact Us
            </button>
          </div>
          <img
            src="https://img.freepik.com/photos-gratuite/femme-affaires-coup-moyen-telephone_23-2148975562.jpg?t=st=1745514069~exp=1745517669~hmac=fba4217afaeb3f504c52b394766edcb3790610251ef4fb023729308a5bd8ab52&w=740"
            alt="Support"
            className="w-full h-[500px] object-cover rounded-xl shadow-lg"
          />
        </div>
      </section>
      <section className="bg-gray-100 py-20 px-6 md:px-16 mt-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Get in Touch
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Have questions or need help? Fill out the form below and we'll get
            back to you shortly.
          </p>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <textarea
              rows={5}
              placeholder="Your Message"
              className="w-full md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              required
            />
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                className="bg-red-700 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default App;
