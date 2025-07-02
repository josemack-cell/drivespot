import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 shadow-sm bg-white">
      {/* Mobile Topbar */}
      <div className="flex items-center justify-between px-4 py-2 md:hidden bg-primary text-white">
        <div className="flex-1 text-center">
          <img src="/logo.svg" alt="Drivespot" className="h-6 mx-auto" />
        </div>
        <div className="absolute right-4 top-2">
          <FaShoppingCart className="text-2xl" />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        {/* Topbar */}
        <div className="bg-navy py-2 text-center">
          <img src="/logo.svg" alt="Drivespot" className="h-8 mx-auto" />
        </div>

        {/* Middlebar */}
        <div className="bg-white flex items-center justify-between px-8 py-4">
          <div className="flex-1" />
          <input
            type="text"
            placeholder="Search parts..."
            className="w-1/2 px-4 py-2 border rounded-md"
          />
          <div className="flex gap-6 items-center flex-1 justify-end">
            <div className="relative">
              <FaShoppingCart className="text-2xl text-navy" />
              <span className="absolute -top-2 -right-3 text-xs bg-accent text-white rounded-full px-1">3</span>
            </div>
            <div className="text-sm">
              <p className="text-gray-700">My Account</p>
              <p className="text-accent">Sign In</p>
            </div>
          </div>
        </div>

        {/* Navbar */}
    <nav className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex space-x-6 py-2">
          <li><a href="#" className="hover:underline">Shop</a></li>
          <li><a href="#" className="hover:underline">Brakes</a></li>
          <li><a href="#" className="hover:underline">Engine Parts</a></li>
          <li><a href="#" className="hover:underline">Suspension</a></li>
        </ul>
      </div>
    </nav>
      </div>
    </header>
  );
}
