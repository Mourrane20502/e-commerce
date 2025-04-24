export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 px-6 md:px-0">
        <div>
          <h4 className="font-bold text-lg mb-4">FashionBrand</h4>
          <p className="text-gray-400">
            Elevate your wardrobe with timeless style and confidence.
          </p>
        </div>
        <div>
          <h5 className="font-semibold mb-2">Shop</h5>
          <ul className="text-gray-400 space-y-2">
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-2">Customer Service</h5>
          <ul className="text-gray-400 space-y-2">
            <li>Help Center</li>
            <li>Returns</li>
            <li>Shipping</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-2">Follow Us</h5>
          <ul className="text-gray-400 space-y-2">
            <li>Instagram</li>
            <li>Facebook</li>
            <li>Twitter</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} FashionBrand. All rights reserved.
      </div>
    </footer>
  );
}
