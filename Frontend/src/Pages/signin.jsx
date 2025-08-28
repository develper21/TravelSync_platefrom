import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: replace with real auth logic
    console.log("submit", { email, password });
    alert("Submitted (check console)");
  }

  function handleGoogleSignIn() {
    // TODO: wire up your OAuth / NextAuth Google signin
    alert("Google Sign-in clicked (wire this up to your auth)");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-6xl rounded-xl shadow-xl overflow-hidden md:grid md:grid-cols-2">
        {/* LEFT - Illustration / promotional area (hidden on small screens) */}
        <div className="hidden md:flex relative items-center justify-center bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 p-10">
          {/* Decorative shapes */}
          <div className="absolute left-6 top-6 w-28 h-28 rounded-full bg-blue-100 opacity-80" />
          <div className="absolute right-6 bottom-6 w-20 h-20 rounded-xl bg-blue-50 opacity-70 transform rotate-6" />

          <div className="w-full max-w-sm p-6 bg-transparent flex items-center justify-center">
            <img
              src="/img1.png"
              alt="Travel visual"
              className="w-80 h-80 rounded-2xl object-cover shadow-lg"
            />
          </div>
        </div>

        {/* RIGHT - Form area */}
        <div className="flex items-start justify-center bg-white p-8 md:p-12">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_20px_25px_rgba(0,0,0,0.10)] p-6 md:p-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600" />
              <div className="text-blue-600 font-bold text-2xl tracking-wide">TravelSync</div>
            </div>

            <div className="mt-6 text-center">
              <h1 className="text-gray-800 font-semibold text-xl md:text-2xl">Sign In</h1>
              <p className="text-gray-500 mt-2">Welcome back! Please sign in to continue.</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6">
              <label className="block">
                <span className="sr-only">Email</span>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full rounded-full bg-gray-100 outline-none border border-gray-200 px-14 py-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-200"
                    aria-label="Email"
                  />
                  <div className="absolute left-4 top-0 bottom-0 flex items-center text-gray-400">@</div>
                </div>
              </label>

              <label className="block mt-4">
                <span className="sr-only">Password</span>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full rounded-full bg-gray-100 outline-none border border-gray-200 px-14 py-3 placeholder-gray-400 focus:ring-2 focus:ring-blue-200"
                    aria-label="Password"
                  />
                  <div className="absolute left-4 top-0 bottom-0 flex items-center text-gray-400">*</div>

                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-blue-600 text-white font-semibold py-3 hover:bg-blue-700 transition-shadow"
              >
                Sign In
              </button>
            </form>

            {/* divider */}
            <div className="flex items-center my-6 gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <div className="text-gray-400 text-sm">OR</div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full rounded-full bg-white border border-gray-200 py-3 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
              aria-label="Sign in with Google"
            >
              {/* simple Google-ish icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 9.2c0-.55-.05-1.08-.14-1.6H9v3.03h4.7c-.2 1.08-.83 1.98-1.78 2.6v2.15h2.88C16.45 14.6 17 12.96 17 9.2z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.47-.8 5.96-2.17l-2.88-2.15c-.8.54-1.83.86-3.08.86-2.37 0-4.37-1.6-5.09-3.76H1.02v2.36C2.52 15.98 5.54 18 9 18z" fill="#34A853"/>
                <path d="M3.91 10.78A5.41 5.41 0 013 9c0-.62.11-1.22.31-1.78V4.86H1.02A8.99 8.99 0 000 9c0 1.45.34 2.82.95 4.02l2.96-2.24z" fill="#FBBC05"/>
                <path d="M9 3.5c1.32 0 2.51.45 3.45 1.34l2.6-2.6C13.44.98 11.42 0 9 0 5.54 0 2.52 2.02 1.02 4.86l2.88 2.36C4.63 5.1 6.63 3.5 9 3.5z" fill="#EA4335"/>
              </svg>

              <span className="text-gray-700 font-medium">Sign in with Google</span>
            </button>

            <div className="mt-6 text-center text-gray-500">
              <span>Don’t have an account? </span>
              <Link to="/signup" className="text-blue-600 font-medium">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
