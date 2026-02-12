import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../services/apiRequest";

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      // Check URL hash for Google OAuth access token
      const hash = window.location.hash;
      if (hash && hash.includes("access_token")) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");

        if (accessToken) {
          // Optional: Clear the hash from the URL for a cleaner look
          window.history.replaceState(null, null, window.location.pathname);

          try {
            const result = await apiRequest(
              "http://localhost/IPTFINALPROJECT/eventSystem/src/backend/loginDatabase.php",
              "POST",
              { action: "googleLogin", token: accessToken }
            );

            if (result.success) {
              // Greeting with full name from backend response
              alert(`Login successful! Welcome ${result.user.fullName}`);
              navigate("/studentView");
            } else {
              alert(result.message);
              navigate("/");
            }
          } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login.");
            navigate("/");
          }
        }
      } else {
        // No token found, redirect to login
        navigate("/");
      }
    };

    handleGoogleLogin();
  }, [navigate]);

  return (
    <div className="w-full flex items-center justify-center min-h-[50vh]">
      <div className="text-center space-y-3">
        <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Processing Login...
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Please wait while we verify your credentials.
        </p>
      </div>
    </div>
  );
}
