import { useEffect, useState } from "react";
import axios from "axios";
import InputField from "../components/InputField";
import Alert from "../components/Alert";
import { FaSpinner } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setSuccessMessage("");
    try {
      const response = await axios.post("/api/auth/forgot-password", { email });
      setSuccessMessage(response.data.message);
    } catch (error) {
      setError("Failed to send reset link.");
    } finally {
      setIsLoading(false);
    }
  };

  // Clear alert after 3 seconds
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
      <div className="flex min-h-full flex-col sm:mx-auto sm:w-full sm:max-w-md justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot your account
          </h2>
        </div>

        <div className="flex h-screen  flex-col sm:mx-auto sm:w-full sm:max-w-md  px-6 py-12 lg:px-8">
          <form onSubmit={handleSubmit}>
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abebebekele12@gmail.com"
            />
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white px-4 py-2 rounded flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
