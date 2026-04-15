import { useNavigate } from "react-router";
import { useState } from "react";
import apiRequest from "../../services/apiRequest";
export default function AuthRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();
  
  const handleRegisterForm = async (e) => {
    e.preventDefault();
    const user = { fullName : fullName, password : password, email : email,  action: "register" };
    try {
      const result = await apiRequest(
        "http://localhost/IPTFINALPROJECT/eventSystem/src/backend/register.php",
        "POST",
        user,
      );

      if (result.success) {
        alert("Registration successful! Please login.");
        navigate("/");
      } else {
        alert("Registration failed: " + result.message);
      }
    } catch (error) {
      alert("Registration request failed: " + error.message);
    }
  };
  
  return (
    <>
      <div className="w-full flex items-center justify-center bg-background-light dark:bg-background-dark p-6 md:p-12">
        <div className="w-full max-w-md bg-white dark:bg-[#1a202c] shadow-xl rounded-xl p-8 space-y-6">
          {/* <!-- Registration Form Section (Hidden by default) --> */}
          <form
            className="space-y-4"
            id="registerForm"
            onSubmit={handleRegisterForm}
          >
            <h2 className="text-2xl font-bold text-[#111318] dark:text-white">
              Register
            </h2>

            <div className="grid grid-cols-1 gap-4">
              <label className="block">
                <span className="text-[#111318] dark:text-gray-200 text-sm font-semibold mb-1 block">
                  Full Name
                </span>
                <input
                  className="w-full rounded-lg border border-[#dbdee6] dark:border-gray-700 dark:bg-gray-800 dark:text-white h-11 px-4 focus:ring-2 focus:ring-primary outline-none"
                  type="text"
                  id="fullName"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="text-[#111318] dark:text-gray-200 text-sm font-semibold mb-1 block">
                  Email
                </span>
                <input
                  className="w-full rounded-lg border border-[#dbdee6] dark:border-gray-700 dark:bg-gray-800 dark:text-white h-11 px-4 focus:ring-2 focus:ring-primary outline-none"
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="block relative">
                <span className="text-[#111318] dark:text-gray-200 text-sm font-semibold mb-1 block">
                  Password
                </span>
                <div className="relative">
                  <input
                    className="w-full rounded-lg border border-[#dbdee6] dark:border-gray-700 dark:bg-gray-800 dark:text-white h-11 px-4 pr-10 focus:ring-2 focus:ring-primary outline-none"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
                    type="button"
                    onClick={() => {
                      const input = document.getElementById("password");
                      const icon = document.getElementById("passwordIcon");
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
                      className="material-symbols-outlined text-[18px]"
                      id="passwordIcon"
                    >
                      visibility
                    </span>
                  </button>
                </div>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-primary/20 transition-all mt-4"
            >
              Register Account
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">Already have an account?</p>
            <a
              onClick={() => navigate("/")}
              className="mt-2 text-primary font-bold hover:underline"
            >
              Return to Login
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
