import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

import { registerUser } from "@/services/authService";
import SocialLogin from "./SocialLogin";

function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await registerUser(formData);

      toast.success("Registration Successful");

      navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.detail || "Registration Failed"
      );
    }
  };

  return (
    <Card className="w-full max-w-md rounded-3xl border-0 shadow-2xl p-10">

      <h1 className="text-4xl font-black">
        Create Account
      </h1>

      <p className="text-slate-500 mt-3">
        Register your account
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 mt-10"
      >

        <Input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <Input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button
          type="submit"
          className="w-full h-12 rounded-xl"
        >
          Register
        </Button>

        <SocialLogin />

      </form>

      <p className="text-center mt-8 text-slate-500">
        Already have an account?

        <Link
          to="/"
          className="ml-2 text-blue-600 font-semibold"
        >
          Login
        </Link>

      </p>

    </Card>
  );
}

export default RegisterForm;