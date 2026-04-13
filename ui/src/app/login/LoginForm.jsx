"use client";

import FormError from "@/components/ui/forms/FormError";
import Input from "@/components/ui/forms/Input";
import Label from "@/components/ui/forms/Label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const loginData = await response.json();

      if (response.ok) {
        // Middleware runs on the server/edge, so it reads auth from cookies.
        document.cookie = `token=${encodeURIComponent(loginData.token)}; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax`;

        window.location.href = "/dashboard";

        alert(loginData.message);
      } else {
        alert(loginData.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to login user");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
        />
        <FormError message={errors.email?.message} />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
        />
        <FormError message={errors.password?.message} />
      </div>
      <div>
        <button
          type="submit"
          className={
            `w-full py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors duration-300` +
            (isValid ? "" : " opacity-50 cursor-not-allowed")
          }
          disabled={!isValid}
        >
          Login
        </button>
      </div>
      <a
        href="/register"
        className="text-indigo-500 hover:text-indigo-600 text-center text-sm block"
      >
        Don&apos;t have an account? Register here
      </a>
    </form>
  );
}
