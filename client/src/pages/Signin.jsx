import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../redux/user/userSlice";
import InputField from "../components/InputField";
import Alert from "../components/Alert";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { FaSpinner } from "react-icons/fa";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, error, loading } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
  };

  useEffect(() => {
    if (currentUser) {
      const timer = setTimeout(() => {
        navigate("/profile");
      }, 3000); // 3 seconds delay
      return () => clearTimeout(timer);
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        // clear error after 6 seconds
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      {error && <Alert message={error} type="error" />}
      {currentUser && <Alert message="Login successful." type="success" />}

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="mt-2">
              <InputField
                id="email"
                name="email"
                type="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={null}
                placeholder="abebebekele12@gmail.com"
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <InputField
                id="password"
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={null}
                placeholder="********"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white px-4 py-2 rounded flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Logging in ...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        <div className="my-4 text-center">or</div>
        <GoogleAuthButton text="Log In with Google" />
        <div className="mt-4 text-center">
          <Link
            to="/forgot-password"
            className="text-indigo-500 text-sm hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signin;
