"use client";

import Input from "@/components/ui/forms/Input";
import Label from "@/components/ui/forms/Label";
import { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submitLogin(e) {
    e.preventDefault();

    // Do validation in future, for now just send the data to the server
    if (!name || !email || !password) {
      alert("Please fill all the fields");
      return;
    }

    // it should not accept numbers and special characters, only letters and spaces
    if (name.length < 3 || !/^[a-zA-Z\s]+$/.test(name)) {
      alert(
        "Name should be at least 3 characters long and contain only letters and spaces",
      );
      return;
    }

    if (password.length < 6) {
      alert("Password should be at least 6 characters long");
      return;
    }

    // send it to my /server/register end point using fetch
    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        // Here you can handle the response from the server, such as showing a success message or redirecting the user.
      })
      .catch((err) => {
        console.error("Error registering user:", err);
        // Here you can handle any errors that occur during the registration process.
      });
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto border border-gray-300">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Register for an Account
      </h2>
      <form className="space-y-6" onSubmit={submitLogin}>
        <div>
          <Label htmlFor="name" required>
            Name
          </Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="email" required>
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="password" required>
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
