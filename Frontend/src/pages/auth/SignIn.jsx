import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath =
    new URLSearchParams(location.search).get("redirect") || "/";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email address";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await signin(formData);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setErrors({
        general: err?.message || "Sign in failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[linear-gradient(90deg,#f7fafc,#e4f2ff)]">
      <main className="min-h-screen w-full flex flex-col lg:flex-row">
        <aside className="relative w-full lg:w-1/2 h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#e8f1fa] via-[#e1f2ff] to-[#c9e7fa]">
          <div className="absolute top-10 left-10 w-24 h-24 rounded-[50px] bg-blue-200/20" />
          <div className="absolute bottom-12 right-12 w-20 h-20 rounded-[24px_76px_69px_31px] bg-blue-200/10" />

          <div className="flex items-center justify-center">
            <img
              src="/public/signin.png"
              alt="Travel illustration"
              className="w-[420px] h-[420px] object-cover rounded-full shadow-xl"
              loading="lazy"
            />
          </div>

          <div className="absolute top-8 left-8 flex items-center gap-3" />
        </aside>

        <section className="w-full lg:w-1/2 flex items-center justify-center py-12 px-6">
          <div className="w-full max-w-md bg-white/95 rounded-2xl shadow-2xl p-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/public/signinLogo.svg"
                  alt="logo"
                  className="w-7 h-7"
                  loading="lazy"
                />
                <h1 className="text-2xl font-semibold text-blue-600">
                  TravelSync
                </h1>
              </div>

              <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                Sign In
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Welcome back! Please sign in to continue.
              </p>

              {errors.general && (
                <div className="w-full mb-4 text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-2 rounded">
                  {errors.general}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="w-full space-y-4"
                noValidate
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-600 mb-2"
                  >
                    Email
                  </label>
                  {Input ? (
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="rounded-full"
                      aria-label="Email"
                    />
                  ) : (
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-full border border-slate-200 bg-[#f5f8fa] px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      aria-label="Email"
                    />
                  )}
                  {errors.email && (
                    <p className="mt-2 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-600 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    {Input ? (
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="rounded-full"
                        aria-label="Password"
                      />
                    ) : (
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="••••••••"
                        className="w-full rounded-full border border-slate-200 bg-[#f5f8fa] px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        aria-label="Password"
                      />
                    )}

                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-3 text-slate-400"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  {Button ? (
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-full"
                    >
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold shadow disabled:opacity-60"
                    >
                      {loading ? "Signing in..." : "Sign In"}
                    </button>
                  )}
                </div>
              </form>

              <div className="w-full flex items-center gap-3 mt-6 mb-4">
                <hr className="flex-1 border-t border-slate-200" />
                <span className="text-xs font-medium text-slate-400">OR</span>
                <hr className="flex-1 border-t border-slate-200" />
              </div>

              <button
                type="button"
                onClick={() => {}}
                className="w-full rounded-full bg-white border border-slate-200 py-3 flex items-center justify-center gap-3 hover:shadow-sm"
              >
                <FaGoogle />
                <span className="text-sm font-medium text-slate-700">
                  Sign in with Google
                </span>
              </button>

              <div className="mt-6 text-sm text-slate-500">
                <span>Don’t have an account? </span>
                <Link
                  to="/signup"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SignIn;
