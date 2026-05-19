import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiRequest from "../../services/apiRequest";
import AuthPhoneNumber from "./AuthPhoneNumber";

export default function AuthLogin() {
  const navigate = useNavigate();
  const [isPhoneNumberOpen, setIsPhoneNumberOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [carouselImages, setCarouselImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Auth/AuthLogin.php");
        const data = await response.json();
        if (data.success && data.images) {
          setCarouselImages(data.images);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (carouselImages.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [carouselImages]);

  const handleGoogleAuth = () => {
    const clientId =
      "1070483531281-lfru2nob62sbeojao9vc74q12o1fia9f.apps.googleusercontent.com";
    const redirectUri = encodeURIComponent("http://localhost:5173/callback");
    const scope = encodeURIComponent("openid email profile");
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}&prompt=select_account&state=google`;
    window.location.href = oauthUrl;
  };

  const handleFacebookAuth = () => {
    const appId = "YOUR_FACEBOOK_APP_ID";
    const redirectUri = encodeURIComponent("http://localhost:5173/callback");
    const scope = encodeURIComponent("email,public_profile");
    const oauthUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token&state=facebook`;
    window.location.href = oauthUrl;
  };

  const handleModal = () => {
    setIsPhoneNumberOpen(!isPhoneNumberOpen);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginForm = async (e) => {
    e.preventDefault();
    setErrors({});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors({ email: "Please enter a valid email address." });
      return;
    }

    const user = { email: email, password: password, action: "login" };
    const result = await apiRequest(
      "http://localhost/IPTFINALPROJECT/eventSystem/src/backend/Auth/Login.php",
      "POST",
      user,
    );
    if (result.success) {
      alert("Login successful! Welcome " + result.user.fullName);
      navigate("/studentView");
    } else {
      setErrors({ server: result.message });
    }
  };

  return (
    <>
      {/* Gradient hero background */}
      <div className="w-full flex items-center justify-center bg-background-light dark:bg-background-dark p-6 md:p-8 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-secondary/20 dark:bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 dark:bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        {/* Card */}
        <div className="flex justify-center items-center w-full gap-5">
          {/* carousel image */}
          {/* carousel image */}
          <div className="relative w-full max-[600px]:hidden h-[600px] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-primary/20 lg:mr-10 bg-gray-100 dark:bg-gray-800 border-4 border-white/10 dark:border-[#1a1a2e]">
            {carouselImages.length > 0 ? (
              <>
                {carouselImages.map((img, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                      index === currentSlide ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105"
                    }`}
                  >
                    <img
                      src={`http://localhost/IPTFINALPROJECT/eventSystem/src/${img.image_path}`}
                      alt={`Event ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Text Content - Fades out quickly, fades in slightly delayed */}
                    <div 
                      className={`absolute bottom-12 left-8 right-8 text-white transform transition-all duration-500 ease-out z-20 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] bg-black/50 backdrop-blur-xs p-6 rounded-2xl border border-white/5 ${
                        index === currentSlide ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-4"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-primary to-accent rounded-full text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-primary/40">
                          {img.category || "Event"}
                        </span>
                        <div className="flex items-center gap-1.5 text-slate-200 text-sm font-medium bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                          <span className="material-symbols-outlined text-[16px] text-accent-light">calendar_today</span>
                          {img.formatted_date}
                        </div>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight text-white">
                        {img.title}
                      </h3>
                      <p className="text-slate-300 text-sm md:text-base line-clamp-2 pr-4 font-bold mb-3">
                        Get ready for this amazing upcoming event. Stay tuned and be part of an unforgettable experience!
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Global Gradient Overlay (Outside the loop to prevent stacking) */}
                <div className="absolute inset-x-0 bottom-0 h-[65%] pointer-events-none" />

                {/* Carousel Indicators */}
                <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-20">
                  {carouselImages.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === currentSlide ? "w-6 bg-primary" : "w-2 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 bg-white dark:bg-surface-light border border-violet-100 dark:border-violet-900/40">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">
                  imagesmode
                </span>
                <span className="text-sm font-medium">No upcoming events</span>
              </div>
            )}
          </div>

          <div className="relative w-full max-w-md bg-white dark:bg-surface-light shadow-2xl shadow-primary/10 dark:shadow-primary/20 rounded-3xl p-8 space-y-3 border border-violet-100 dark:border-violet-900/40">
            {/* Header */}
            <div className="text-left mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-xs font-bold uppercase tracking-widest mb-4">
                <span className="material-symbols-outlined text-[14px]">
                  lock
                </span>
                Secure Login
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                Welcome back
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
                Sign in to your SACLI Event System account.
              </p>
            </div>

            <div className="space-y-6" id="login-container">
              <form className="space-y-4" onSubmit={handleLoginForm}>
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block">
                    <span className="text-slate-800 dark:text-slate-200 text-sm font-semibold mb-1.5 block">
                      Email
                    </span>
                    <input
                      className="w-full rounded-xl border border-violet-200 dark:border-violet-900/40 dark:bg-background-dark dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400 text-slate-800"
                      type="email"
                      id="loginEmail"
                      placeholder="you@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  {errors.email && (
                    <p className="text-xs text-secondary font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="block relative">
                    <span className="text-slate-800 dark:text-slate-200 text-sm font-semibold mb-1.5 block">
                      Password
                    </span>
                    <div className="relative">
                      <input
                        className="w-full rounded-xl border border-violet-200 dark:border-violet-900/40 dark:bg-background-dark dark:text-white h-12 px-4 pr-12 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400 text-slate-800"
                        type="password"
                        id="loginPassword"
                        placeholder="••••••••"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                        type="button"
                        onClick={() => {
                          const input =
                            document.getElementById("loginPassword");
                          const icon =
                            document.getElementById("loginPasswordIcon");
                          if (input.type === "password") {
                            input.type = "text";
                            icon.textContent = "visibility_off";
                          } else {
                            input.type = "password";
                            icon.textContent = "visibility";
                          }
                        }}
                      >
                        <span
                          className="material-symbols-outlined text-[20px]"
                          id="loginPasswordIcon"
                        >
                          visibility
                        </span>
                      </button>
                    </div>
                  </label>
                </div>

                {errors.server && (
                  <div className="p-3 bg-secondary/10 border border-secondary/30 text-secondary rounded-xl text-xs font-semibold">
                    {errors.server}
                  </div>
                )}

                <button
                  className="w-full bg-grad-primary text-white font-black py-3 px-6 rounded-xl shadow-glow-primary btn-primary-glow transition-all flex items-center justify-center gap-2 text-sm mt-2"
                  type="submit"
                >
                  Sign In
                  <span className="material-symbols-outlined text-lg">
                    login
                  </span>
                </button>
              </form>

              <div className="text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Don't have an account?{" "}
                  <button
                    onClick={() => navigate("/register")}
                    className="text-primary dark:text-primary-light font-bold hover:underline"
                  >
                    Register
                  </button>
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 border-t border-violet-100 dark:border-violet-900/30" />
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                  or continue with
                </span>
                <div className="flex-1 border-t border-violet-100 dark:border-violet-900/30" />
              </div>

              {/* Social buttons */}
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  className="w-full bg-white dark:bg-background-dark border border-violet-200 dark:border-violet-900/40 text-slate-700 dark:text-white font-semibold py-3 px-4 rounded-xl hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/30 transition-all flex items-center justify-center gap-2 text-sm"
                  onClick={handleModal}
                >
                  <span className="material-symbols-outlined text-[20px] text-primary">
                    call
                  </span>
                  Phone Number
                </button>

                <div className="flex gap-3">
                  <button
                    id="googleLoginBtn"
                    type="button"
                    onClick={handleGoogleAuth}
                    className="flex-1 bg-white dark:bg-background-dark border border-violet-200 dark:border-violet-900/40 text-slate-700 dark:text-white font-semibold py-3 px-4 rounded-xl hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/30 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
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
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={handleFacebookAuth}
                    className="flex-1 bg-white dark:bg-background-dark border border-violet-200 dark:border-violet-900/40 text-slate-700 dark:text-white font-semibold py-3 px-4 rounded-xl hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/30 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPhoneNumberOpen && <AuthPhoneNumber toggleModal={handleModal} />}
    </>
  );
}
