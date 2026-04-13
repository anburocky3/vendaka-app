"use client";

import FormError from "@/components/ui/forms/FormError";
import Input from "@/components/ui/forms/Input";
import Label from "@/components/ui/forms/Label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function submitLogin(formData) {
    // send it to my /server/register end point using fetch
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.message || data.error);

      if (response.ok) {
        reset();
      }
    } catch (err) {
      console.error("Error registering user:", err);
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto border border-gray-300">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Register for an Account
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit(submitLogin)}>
        <div>
          <Label htmlFor="name" required>
            Name
          </Label>
          <Input
            id="name"
            placeholder="Enter your name"
            {...register("name")}
          />
          <FormError message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="email" required>
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          <FormError message={errors.email?.message} />
        </div>
        <div>
          <Label htmlFor="password" required>
            Password
          </Label>
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
              `w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500` +
              (isValid ? "" : " opacity-50 cursor-not-allowed")
            }
            disabled={!isValid}
          >
            Register
          </button>
        </div>
        <a
          href="/login"
          className="text-indigo-500 hover:text-indigo-600 text-center text-sm block"
        >
          Already have an account? Login here
        </a>
      </form>
    </div>
  );
}
