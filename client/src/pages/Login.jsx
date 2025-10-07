import React, { useState } from "react";

const Login = () => {
  const [mode, setMode] = useState("login"); // login or register
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Add login/register API call here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
    >
      <h1 className="text-gray-900 text-3xl mt-10 font-medium">
        {mode === "login" ? "Login" : "Sign up"}
      </h1>
      <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>

      {/* Name field only for register */}
      {mode !== "login" && (
        <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-lg overflow-hidden pl-6 gap-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border-none outline-none ring-0 w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
      )}

      {/* Email */}
      <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-lg overflow-hidden pl-6 gap-2">
        <input
          type="email"
          name="email"
          placeholder="Email id"
          className="border-none outline-none ring-0 w-full"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Password */}
      <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-lg overflow-hidden pl-6 gap-2">
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border-none outline-none ring-0 w-full"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {/* Forget password */}
      <div className="mt-4 text-left text-purple-500">
        <button type="reset" className="text-sm">
          Forget password?
        </button>
      </div>

      {/* Submit button with purple color and slightly rounded corners */}
      <button
        type="submit"
        className="mt-4 w-full h-11 rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors"
      >
        {mode === "login" ? "Login" : "Sign up"}
      </button>

      {/* Toggle login/register */}
      <p
        onClick={() =>
          setMode((prev) => (prev === "login" ? "register" : "login"))
        }
        className="text-gray-500 text-sm mt-3 mb-11 cursor-pointer"
      >
        {mode === "login"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <span className="text-purple-500 hover:underline">click here</span>
      </p>
    </form>
  );
};

export default Login;
