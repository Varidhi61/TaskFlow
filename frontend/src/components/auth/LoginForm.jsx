import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

import { Eye, EyeOff } from "lucide-react";

import { loginUser } from "@/services/authService";

function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      localStorage.setItem("token", data.access_token);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error?.response?.data?.detail || "Login Failed"
      );
    }
  };

  return (
    <Card className="w-full max-w-md rounded-3xl p-10 shadow-2xl">

      <h1 className="text-4xl font-bold">
        Welcome Back
      </h1>

      <p className="mt-2 text-slate-500">
        Login to continue
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 mt-8"
      >

        <Input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <div className="relative">

          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-4 top-3"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>

        </div>

        <Button
          type="submit"
          className="w-full"
        >
          Login
        </Button>

      </form>

      <p className="text-center mt-6">

        Don't have an account?

        <Link
          to="/register"
          className="ml-2 text-blue-600"
        >
          Register
        </Link>

      </p>

    </Card>
  );
}

export default LoginForm;