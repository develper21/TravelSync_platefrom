import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0b1f3a] to-[#0050d5] text-white py-10 px-4 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

        {/* Logo + Description */}
        <div className="col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.png" alt="TravelSync Logo" className="h-7 w-auto" />
              <span className="text-xl font-semibold">TravelSync</span>
            </div>
            <p className="text-sm text-gray-200 mb-4">
              Your trusted partner for seamless travel <br />
              planning and booking worldwide.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 text-xl">
              <a href="#" className="hover:text-blue-400"><FaFacebook /></a>
              <a href="#" className="hover:text-pink-400"><FaInstagram /></a>
              <a href="#" className="hover:text-gray-300"><FaXTwitter /></a>
              <a href="#" className="hover:text-red-500"><FaYoutube /></a>
            </div>
          </div>
        </div>

        {/* Footer Links Row */}
        <div className="md:col-span-3 w-full">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full gap-6 md:gap-2">
            {/* About */}
            <div>
              <h3 className="font-semibold mb-3">About</h3>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><a href="#" className="hover:text-white">Company</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">Bookings</a></li>
                <li><a href="#" className="hover:text-white">Trip Planner</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="min-w-[220px]">
              <h3 className="font-semibold mb-2">Subscribe to Newsletter</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 rounded-md text-black text-sm outline-none bg-white flex-1"
                />
                <button className="bg-green-500 hover:bg-green-600 px-4 py-2 text-sm font-medium rounded-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-8 text-center text-xs text-gray-300">
        © 2025 TravelSync. All rights reserved.
      </div>
    </footer>
  );
}
