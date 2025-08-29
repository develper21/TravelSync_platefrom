// import { NavLink } from "react-router-dom";

// export default function Navbar() {
//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Explore", path: "/explore" },
//     { name: "Bookings", path: "/bookings" },
//     { name: "About", path: "/about" },
//     { name: "Contact", path: "/contact" },
//   ];

//   return (
//     <nav className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-[#f8fbff] to-[#fdfdff] shadow-sm">
//       {/* Logo */}
//       <div className="flex items-center space-x-2">
//         <img src="/logo.png" alt="TravelSync Logo" className="h-6 w-auto" />
//         <span className="text-xl font-semibold text-blue-600">TravelSync</span>
//       </div>

//       {/* Nav Links */}
//       <div className="flex space-x-6">
//         {navLinks.map((link) => (
//           <NavLink
//             key={link.name}
//             to={link.path}
//             className={({ isActive }) =>
//               `text-sm font-medium transition-colors duration-200 ${
//                 isActive
//                   ? "text-blue-600"
//                   : "text-black hover:text-blue-600"
//               }`
//             }
//           >
//             {link.name}
//           </NavLink>
//         ))}
//       </div>

//       {/* Buttons */}
//       <div className="flex space-x-3">
//         <button className="px-4 py-1 text-sm border border-blue-600 rounded-md text-blue-600 hover:bg-blue-50 transition">
//           Sign In
//         </button>
//         <button className="px-4 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
//           Sign Up
//         </button>
//       </div>
//     </nav>
//   );
// }
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Explore", path: "/explore" },
    { name: "Bookings", path: "/bookings" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#f8fbff] to-[#fdfdff] shadow-sm px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="TravelSync Logo" className="h-6 w-auto" />
          <span className="text-xl font-semibold text-blue-600">TravelSync</span>
        </div>

        {/* Nav Links (centered) */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="text-sm font-medium transition-colors duration-200 text-black hover:text-blue-600">
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex items-center px-2 py-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Buttons (right) */}
        <div className="hidden md:flex items-center space-x-3">
          <button className="px-4 py-1 text-sm border border-blue-600 rounded-md text-blue-600 hover:bg-blue-50 transition">
            Sign In
          </button>
          <button className="px-4 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
            Sign Up
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 flex flex-col space-y-2 bg-white rounded shadow px-4 py-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `block text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-blue-600"
                    : "text-black hover:text-blue-600"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
          <button className="w-full mt-2 px-4 py-2 text-sm border border-blue-600 rounded-md text-blue-600 hover:bg-blue-50 transition">
            Sign In
          </button>
          <button className="w-full mt-2 px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
}