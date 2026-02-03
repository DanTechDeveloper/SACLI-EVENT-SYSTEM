import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useEffect, useState } from "react"; 
import apiRequest from "../../services/apiRequest";

export default function AuthLogin() {
  const navigate = useNavigate(); // Initialize useNavigate
  const handleGoogleAuth = () => {
    const clientId =
      "1070483531281-lfru2nob62sbeojao9vc74q12o1fia9f.apps.googleusercontent.com";
    const redirectUri = encodeURIComponent("http://localhost:5173");
    const scope = encodeURIComponent("openid email profile");
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}&prompt=select_account`;

    // Redirect to Google's OAuth2 endpoint
    window.location.href = oauthUrl;
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginForm = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    const user = { email : email, password : password, action: "login" };
    const result = await apiRequest(
      "http://localhost/IPTFINALPROJECT/eventSystem/src/backend/loginDatabase.php",
      "POST",
      user
    );
    if (result.success) {
      alert("Login successful! Welcome " + result.user.fullName);
      navigate("/student");
    } else {
      alert("Login failed: " + result.message);
    }
  };

  return (
    <>
      <div class="w-full flex items-center justify-center bg-background-light dark:bg-background-dark p-6 md:p-6">
        <div class="w-full max-w-md bg-white dark:bg-[#1a202c] shadow-xl rounded-xl p-8 space-y-3">
          {/* <!-- Login Form Section (Default) --> */}
          <div class="space-y-6" id="login-container">
            <div class="text-left mb-8">
              <h2 class="text-2xl font-bold text-[#111318] dark:text-white">
                Login
              </h2>
              <p class="text-gray-500 dark:text-gray-400 mt-1">
                Please enter your credentials to continue.
              </p>
            </div>
            <form class="space-y-4" onSubmit={handleLoginForm}>
              <div class="space-y-2">
                <label class="block">
                  <span class="text-[#111318] dark:text-gray-200 text-sm font-semibold mb-2 block">
                    Email
                  </span>
                  <input
                    class="w-full rounded-lg border border-[#dbdee6] dark:border-gray-700 dark:bg-gray-800 dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400"
                    type="email"
                    id="loginEmail"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>
              <div class="space-y-2">
                <label class="block relative">
                  <div class="flex justify-between mb-2">
                    <span class="text-[#111318] dark:text-gray-200 text-sm font-semibold">
                      Password
                    </span>
                  </div>
                  <div class="relative">
                    <input
                      class="w-full rounded-lg border border-[#dbdee6] dark:border-gray-700 dark:bg-gray-800 dark:text-white h-12 px-4 pr-12 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400"
                      type="password"
                      id="loginPassword"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
                      type="button"
                      onclick="togglePasswordVisibility('loginPassword')"
                    >
                      <span
                        class="material-symbols-outlined text-[20px]"
                        id="loginPasswordIcon"
                      >
                        visibility
                      </span>
                    </button>
                  </div>
                </label>
              </div>

              <button
                class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                type="submit"
              >
                Sign In
                <span class="material-symbols-outlined text-lg">login</span>
              </button>
            </form>
            <div class="text-center mt-6">
              <p class="text-sm text-gray-500">
                Don't have an account?
                <button
                  onClick={() => navigate("/register")} // Use navigate to redirect
                  className="text-primary font-bold hover:underline"
                >
                  Register
                </button>
              </p>
            </div>

            <div class=" flex items-center gap-2 my-6">
              <div class="flex-1 border-t border-[#dbdee6] dark:border-gray-700"></div>
              <span class="text-xs text-gray-500">or continue with</span>
              <div class="flex-1 border-t border-[#dbdee6] dark:border-gray-700"></div>
            </div>

            <div class="flex gap-3">
              <button
                id="googleLoginBtn"
                type="button"
                onClick={handleGoogleAuth}
                class="flex-1 bg-white dark:bg-gray-800 border border-[#dbdee6] dark:border-gray-700 text-[#111318] dark:text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span class="text-sm">Google</span>
              </button>
              <button
                type="button"
                onclick="handle3rdPartyLogin('facebook')"
                class="flex-1 bg-white dark:bg-gray-800 border border-[#dbdee6] dark:border-gray-700 text-[#111318] dark:text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span class="text-sm">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
