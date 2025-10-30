import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((s) => ({ ...s, [name]: type === 'checkbox' ? checked : value }));

    if (errors[name] || errors.general) {
      setErrors((prev) => ({ ...prev, [name]: '', general: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password))
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      await signup(userData);
      navigate('/');
    } catch (error) {
      setErrors({ general: error?.message || 'Sign up failed. Please try again.' });
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
              src="/public/signup.png"
              alt="Travel illustration"
              className="w-[420px] h-[420px] object-cover rounded-full shadow-xl"
              loading="lazy"
            />
          </div>

          <div className="absolute top-8 left-8 flex items-center gap-3"/>
        </aside>

        <section className="w-full lg:w-1/2 flex items-center justify-center py-12 px-6">
          <div className="w-full max-w-md bg-white py-8 px-6 sm:px-10 rounded-2xl shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-3">
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
            </div>

            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
              <p className="mt-2 text-sm text-gray-600">Join TravelSync and start planning your perfect trip</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{errors.general}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Input ? (
                  <Input
                    label="First Name"
                    name="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    required
                  />
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    />
                    {errors.firstName && <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>}
                  </div>
                )}

                {Input ? (
                  <Input
                    label="Last Name"
                    name="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    required
                  />
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    />
                    {errors.lastName && <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>}
                  </div>
                )}
              </div>

              {Input ? (
                <Input
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                  {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                </div>
              )}

              <div className="relative">
                {Input ? (
                  <Input
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    required
                  />
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    />
                    {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
                  </div>
                )}
                <button
                  type="button"
                  className="absolute right-3 top-10 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="relative">
                {Input ? (
                  <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    required
                  />
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    />
                    {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}
                  </div>
                )}
                <button
                  type="button"
                  className="absolute right-3 top-10 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="flex items-center">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeToTerms && <p className="text-red-600 text-sm">{errors.agreeToTerms}</p>}

              <div>
                {Button ? (
                  <Button type="submit" loading={loading} className="w-full" size="lg">
                    {loading ? 'Creating account...' : 'Create account'}
                  </Button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold shadow disabled:opacity-60"
                  >
                    {loading ? 'Creating account...' : 'Create account'}
                  </button>
                )}
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Already have an account?</span>
                </div>
              </div>

              <div className="mt-4">
                <Link to="/signin">
                  {Button ? (
                    <Button variant="outline" className="w-full">
                      Sign in instead
                    </Button>
                  ) : (
                    <button className="w-full rounded-md border border-gray-300 py-2 text-sm">Sign in instead</button>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SignUp;
