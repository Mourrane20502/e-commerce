import { HeartIcon, Menu, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useScroll from "../../hooks/useScroll";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isScrolled } = useScroll();

  const navLinks = [
    { to: "/women", label: "Women" },
    { to: "/men", label: "Men" },
    { to: "/kids", label: "Kids" },
    { to: "/login", label: "Login" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-gray-900 text-white" : "bg-white shadow-md text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto p-5 flex items-center justify-between">
        <Link
          to="/"
          className={`text-2xl font-bold transition-all duration-300 ${
            isScrolled ? "text-gray-200" : "text-gray-900"
          }`}
        >
          Cartify
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={`cursor-pointer transition-all duration-300 ${
                isScrolled ? "text-white" : "text-gray-900"
              }`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div
          className={`flex items-center space-x-4 transition-all duration-300 ${
            isScrolled ? "text-gray-200" : "text-gray-600 hover:text-black"
          }`}
        >
          <Link to="/wishlist" aria-label="Wishlist">
            <HeartIcon className="w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-200" />
          </Link>
          <Link to="/login" aria-label="User Profile">
            <User className="w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-200" />
          </Link>
          <Link to="/cart" aria-label="Shopping Cart">
            <ShoppingCart className="w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-200" />
          </Link>
          {isOpen ? (
            <X onClick={() => setIsOpen(false)} />
          ) : (
            <Menu
              onClick={() => setIsOpen(true)}
              className="md:hidden w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-200"
            />
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div
          className={`md:hidden w-1/2 transition-all duration-300 ease-in-out flex items-start justify-start flex-col gap-2 absolute h-screen right-0 ${
            isScrolled ? "bg-black text-white" : "bg-white text-gray-800"
          } shadow-md rounded-b-lg px-5 py-4 space-y-3`}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="block font-medium hover:text-black"
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
