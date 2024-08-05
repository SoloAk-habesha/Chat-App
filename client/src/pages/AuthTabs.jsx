import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState("signin");

  return (
    <div className="flex min-h-full flex-col sm:mx-auto sm:w-full sm:max-w-md justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {activeTab === "signin"
            ? "Sign in to your account"
            : "Sign up for an account"}
        </h2>
      </div>

      <nav
        className="relative z-0 flex overflow-hidden  border-b-2"
        aria-label="Tabs"
        role="tablist"
        aria-orientation="horizontal"
      >
        <button
          type="button"
          className={`relative min-w-0 flex-1 bg-white py-4 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-none ${
            activeTab === "signin"
              ? "text-gray-900 border-b-2 border-indigo-600"
              : ""
          }`}
          onClick={() => setActiveTab("signin")}
          role="tab"
        >
          Sign In
        </button>
        <button
          type="button"
          className={`relative min-w-0 flex-1 bg-white py-4 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-none ${
            activeTab === "signup"
              ? "text-gray-900 border-b-2 border-indigo-600"
              : ""
          }`}
          onClick={() => setActiveTab("signup")}
          role="tab"
        >
          Sign Up
        </button>
      </nav>

      <div className="mt-3">
        {activeTab === "signin" && (
          <div role="tabpanel" aria-labelledby="signin">
            <Signin />
          </div>
        )}
        {activeTab === "signup" && (
          <div role="tabpanel" aria-labelledby="signup">
            <Signup />
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthTabs;
