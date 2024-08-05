import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css"; // Import your custom CSS file

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // "success" or "error"

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`/api/auth/verify/${token}`);
        setAlertMessage("Your email has been successfully verified.");
        setAlertType("success");
        setTimeout(() => navigate("/auth"), 2000);
      } catch (error) {
        console.error(error);
        setAlertMessage("Email verification failed. Please try again.");
        setAlertType("error");
      }
    };
    verifyEmail();
  }, [token, navigate]);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
        setAlertType("");
      }, 5000); // Hide after 20 seconds
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [alertMessage]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {alertMessage && (
        <div
          className={`fixed top-4 right-4 p-4 mb-4 text-sm rounded-lg shadow-lg transition-transform transform ${
            alertType === "success"
              ? "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400 slide-in"
              : "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400 slide-in"
          }`}
          role="alert"
        >
          <span className="font-medium">
            {alertType === "success" ? "Email Verified!" : "Verification Error"}
          </span>{" "}
          {alertMessage}
        </div>
      )}
      {!alertMessage && (
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="sr-only">Verifying...</span>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
