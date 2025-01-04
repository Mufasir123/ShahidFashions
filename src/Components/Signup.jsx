import React, { useEffect, useState } from 'react'
import { motion } from "motion/react";


const Signup = () => {
  const [showLogin,setShowLogin] = useState(false);
  const [state, setState] = useState("Login");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>

        {state !== "Login" && (
          <div className="border px-6 flex items-center gap-2 rounded-full mt-5">
            <img src="" alt="" className="w-5 mr-1" />
            <input
              className="outline-none text-sm "
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
        )}

        <div className="border px-6 flex items-center gap-2 rounded-full mt-4">
          <img src="" alt="" />
          <input
            className="outline-none text-sm"
            type="email"
            placeholder="Email id"
            required
          />
        </div>

        <div className="border px-6 flex items-center gap-2 rounded-full mt-4">
          <img src="" alt="" />
          <input
            className="outline-none text-sm"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Forgot Password?
        </p>

        <button className="bg-blue-600 w-full text-white py-2 rounded-full">
          {state === "Login" ? "Login" : "Create Account"}{" "}
        </button>

        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>{" "}
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>{" "}
          </p>
        )}

        <button onClick={() => setShowLogin(false)}
          className="absolute top-5 right-5 "
          >X</button>
        {/* <img
          src=""
          alt="close"
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setShowLogin(false)}
        /> */}
      </motion.form>
    </div>
  )
}

export default Signup
