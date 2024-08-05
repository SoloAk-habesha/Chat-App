import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../components/InputField";
import Alert from "../components/Alert";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { FaSpinner } from "react-icons/fa";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setSuccessMessage("");
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      console.log(response.data);
      localStorage.setItem("token", response.data);
      setSuccessMessage("Login successful.");
      navigate("/profile");
    } catch (error) {
      console.log(error);
      setError("Invalid credentials or email not verified.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuthClick = () => {
    setIsGoogleLoading(true);
    window.location.href = "/api/auth/google";
  };

  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError("");
        setSuccessMessage("");
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [error, successMessage]);

  return (
    <>
      {(error || successMessage) && (
        <Alert
          message={error || successMessage}
          type={successMessage ? "success" : "error"}
        />
      )}

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
                error={error}
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
                error={error}
                placeholder="********"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white px-4 py-2 rounded flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
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
        <GoogleAuthButton
          text="Log In with Google"
          isLoading={isGoogleLoading}
          onClick={handleGoogleAuthClick}
        />
        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-indigo-500 text-sm">
            Forgot Password?
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signin;
