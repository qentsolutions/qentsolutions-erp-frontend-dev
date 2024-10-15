// pages/index.tsx
"use client";

import React, { useState } from "react";
import Signin from "../portal/components/signin";
import Signup from "../portal/components/signup";
import { Navbar } from "../(marketing)/components/navbar";


const Home = () => {
  const [isSigningIn, setIsSigningIn] = useState(true);

  const handleToggle = () => {
    setIsSigningIn(!isSigningIn);
  };

  return (
    <div className="flex min-h-screen">
        <Navbar />
      {/* Partie gauche : image et texte */}
      <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}>
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <h1 className="text-white text-4xl font-bold">Welcome to Our App</h1>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isSigningIn ? "Sign In" : "Sign Up"}
          </h2>
          {isSigningIn ? <Signin /> : <Signup />}
          <button
            onClick={handleToggle}
            className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
          >
            {isSigningIn ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
