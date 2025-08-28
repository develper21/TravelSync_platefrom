import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function validate() {
    if (!fullName.trim() || !email.trim() || !password) {
      setError("Please fill all required fields.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    // simple email regex
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      setError("Please enter a valid email.");
      return false;
    }
    setError("");
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    // TODO: replace with real sign-up logic (call API / NextAuth / backend)
    console.log({ fullName, email });
    alert("Account created (demo). Implement backend to complete signup.");
  }

  function handleGoogleSignup() {
    // TODO: wire up Google OAuth / NextAuth
    alert("Google signup clicked — wire this to your auth provider.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden bg-white md:flex md:h-[718px]">
        {/* Left promotional panel */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-b from-blue-50 to-white p-8 relative">
          <div className="max-w-sm mx-auto mt-6">
            <img
              src="/img2.png"
              alt="Travel visual"
              className="w-[288px] h-[288px] mx-auto rounded-lg object-cover"
            />
            <h2 className="text-center mt-8 text-3xl font-semibold text-[#3867D6]">Welcome to TravelSync</h2>
            <p className="text-center mt-3 text-lg text-gray-600">Plan adventures, sync itineraries, and explore the world with friends.</p>
          </div>
        </div>

        {/* Right form panel */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-extrabold text-[#22223B]">Create your account</h1>
            <p className="mt-2 text-gray-500">Sign up for TravelSync to start planning your next trip!</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {error && <div className="text-red-600 text-sm">{error}</div>}

              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-2 block w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 block w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="you@company.com"
                  type="email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative mt-2">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 pr-28 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Create a password"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-2 block w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Repeat your password"
                  type={showPassword ? "text" : "password"}
                  required
                />
              </div>

              <button className="w-full mt-2 rounded-lg bg-[#3C82F6] text-white font-semibold py-3 shadow-md hover:bg-blue-600 transition">
                Create Account
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <div className="px-4 text-sm text-gray-400">Or sign up with Google</div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <button
              onClick={handleGoogleSignup}
              className="w-full rounded-lg bg-white border border-gray-200 py-3 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 9.2c0-.55-.05-1.08-.14-1.6H9v3.03h4.7c-.2 1.08-.83 1.98-1.78 2.6v2.15h2.88C16.45 14.6 17 12.96 17 9.2z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.47-.8 5.96-2.17l-2.88-2.15c-.8.54-1.83.86-3.08.86-2.37 0-4.37-1.6-5.09-3.76H1.02v2.36C2.52 15.98 5.54 18 9 18z" fill="#34A853"/>
                <path d="M3.91 10.78A5.41 5.41 0 013 9c0-.62.11-1.22.31-1.78V4.86H1.02A8.99 8.99 0 000 9c0 1.45.34 2.82.95 4.02l2.96-2.24z" fill="#FBBC05"/>
                <path d="M9 3.5c1.32 0 2.51.45 3.45 1.34l2.6-2.6C13.44.98 11.42 0 9 0 5.54 0 2.52 2.02 1.02 4.86l2.88 2.36C4.63 5.1 6.63 3.5 9 3.5z" fill="#EA4335"/>
              </svg>
              <span className="text-gray-700 font-semibold">Sign up with Google</span>
            </button>

            <div className="mt-6 text-center text-gray-600">
              <span>Already have an account? </span>
              <Link to="/signin" className="text-[#3C82F6] font-semibold">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
