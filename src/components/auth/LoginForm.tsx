"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";

const LoginForm = () => {
  const params = useSearchParams();
  const router = useRouter();
  const callback = params.get("callbackUrl") || "/";
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = { email: "", password: "" };
    if (!form.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email address.";
    if (!form.password) newErrors.password = "Password is required.";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const result = await signIn("credentials", { email: form.email, password: form.password, redirect: false, callbackUrl: callback });
    if (!result?.ok) {
      setErrors({ ...errors, password: "Incorrect email or password." });
    } else {
      router.push(callback);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-8">
      {loading && (
        <div className="fixed inset-0 z-20 bg-base-100/80 backdrop-blur-sm flex flex-col justify-center items-center gap-3">
          <AiOutlineLoading size={48} className="animate-spin text-sky-500" />
          <p className="text-base-content font-semibold animate-pulse">Logging in...</p>
        </div>
      )}
      <div className="w-full max-w-sm bg-base-100 rounded-2xl shadow-xl border border-base-300 overflow-hidden">
        <div className="bg-linear-to-r from-sky-600 to-teal-500 px-6 py-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-1">Welcome Back!</h1>
          <p className="text-sky-100 text-sm">Login to your Navora account</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>
          <div>
            <label className="block text-sm font-semibold text-base-content mb-1">Email Address</label>
            <input name="email" type="email" value={form.email} onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl outline-none transition-all bg-base-200 text-base-content focus:ring-2 focus:ring-sky-500 ${errors.email ? "border-red-400" : "border-base-300"}`}
              placeholder="Enter your email" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-base-content mb-1">Password</label>
            <div className="relative">
              <input name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange}
                className={`w-full px-4 py-3 pr-12 border rounded-xl outline-none transition-all bg-base-200 text-base-content focus:ring-2 focus:ring-sky-500 ${errors.password ? "border-red-400" : "border-base-300"}`}
                placeholder="Enter your password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-sky-500">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <button disabled={loading} type="submit"
            className="w-full btn btn-primary text-white font-semibold py-3 rounded-xl disabled:opacity-50">
            {loading ? <AiOutlineLoading className="animate-spin mx-auto" size={20} /> : "Login"}
          </button>
          <div className="relative flex items-center">
            <div className="flex-1 border-t border-base-300" />
            <span className="px-3 text-base-content/40 text-sm">OR</span>
            <div className="flex-1 border-t border-base-300" />
          </div>
          <button type="button" onClick={() => signIn("google", { callbackUrl: callback })}
            className="w-full flex items-center justify-center gap-3 bg-base-200 border-2 border-base-300 hover:border-sky-500 text-base-content font-semibold py-3 rounded-xl transition-all hover:shadow-md group">
            <FcGoogle className="text-2xl group-hover:scale-110 transition-transform" />
            Continue with Google
          </button>
          <p className="text-center text-sm text-base-content/50 pt-2 border-t border-base-300">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-sky-500 font-semibold hover:underline">Register Now</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
