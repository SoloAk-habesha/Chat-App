import { useEffect, useState } from "react";
import axios from "axios";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../form/validate";
import Alert from "../components/Alert";
import InputField from "../components/InputField";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { FaSpinner } from "react-icons/fa";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    const nameValidationError = validateName(name);
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    if (
      nameValidationError ||
      emailValidationError ||
      passwordValidationError
    ) {
      setNameError(nameValidationError);
      setEmailError(emailValidationError);
      setPasswordError(passwordValidationError);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      console.log(response);
      setSuccessMessage(
        "Signup successful. Please check your email for verification."
      );
      navigate("/auth");
    } catch (error) {
      console.log(error);
      setError(
        error.response ? error.response.data.message : "Error during signup."
      );
    } finally {
      setLoading(false);
    }
  };

  // Clear alert after 3 seconds
  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError("");
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, successMessage]);

  const handleGoogleAuthClick = () => {
    setIsGoogleLoading(true);
    window.location.href = "/api/auth/google";
  };

  return (
    <>
      {(error || successMessage) && (
        <Alert
          message={error || successMessage}
          type={successMessage ? "success" : "error"}
        />
      )}

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="mt-2">
              <InputField
                id="name"
                name="name"
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError}
                placeholder="Abebe Bekele"
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <InputField
                id="email"
                name="email"
                type="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
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
                error={passwordError}
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
                  Signing up ...
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>

        <div className="my-4 text-center">or</div>
        <GoogleAuthButton
          text="Signup with Google"
          isLoading={isGoogleLoading}
          onClick={handleGoogleAuthClick}
        />
      </div>
    </>
  );
};

export default Signup;
