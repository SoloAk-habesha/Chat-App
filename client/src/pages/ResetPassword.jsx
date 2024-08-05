import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import InputField from "../components/InputField";
import Alert from "../components/Alert";
import { FaSpinner } from "react-icons/fa";
import { validatePassword } from "../form/validate";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPasswordError("");
    setConfirmPasswordError("");
    setError("");
    setIsLoading(true);
    setSuccessMessage("");

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setIsLoading(false);
      setPasswordError(passwordValidationError);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`/api/auth/reset-password/${token}`, {
        password,
      });
      setSuccessMessage(response.data.message);

      setTimeout(() => {
        navigate("/auth");
      }, 3000);
    } catch (error) {
      setError("Error resetting password.");
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
        setIsLoading(false);
      }, 3000);
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
            Reset your password
          </h2>
        </div>
        <div className="flex h-screen  flex-col sm:mx-auto sm:w-full sm:max-w-md  py-12 ">
          <form onSubmit={handleSubmit}>
            <InputField
              label="New Password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
            />
            <InputField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              error={confirmPasswordError}
            />
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white px-4 py-2 rounded flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
