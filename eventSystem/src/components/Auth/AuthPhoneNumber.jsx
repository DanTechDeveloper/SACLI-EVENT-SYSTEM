import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AuthPhoneNumber({ toggleModal }) {

    const handleStudentContent = async (e) => {
      e.preventDefault();
      
      const res = await fetch("http://localhost/IPTFINALPROJECT/eventSystem/src/backend/loginDatabase.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          action: "phoneLogin",
          phoneNumber,
          fullName
        })
      });

      const data = await res.json();
      if (data.success) {
        navigate("/studentView");
      } else {
        alert(data.message || "Login failed on server");
      }
    }

  const handleSendOTP = async () => {
    if (!fullName || fullName.trim() === "") {
      alert("Please enter your Full Name first.");
      return;
    }

    const res = await fetch("http://localhost/IPTFINALPROJECT/eventSystem/src/backend/sendOtp.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        phoneNumber,
        fullName,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("OTP sent");
    }
  };

  const handleVerifyOTP = async () => {
    const res = await fetch("http://localhost/IPTFINALPROJECT/eventSystem/src/backend/verifyOTP.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        phoneNumber,
        code,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("OTP verified");
      setIsVerified(true);
    } else {
      alert(data.message || "OTP verification failed");
    }
  }
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={toggleModal}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-[#1a202c] p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
        <button
          onClick={toggleModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
            <span className="material-symbols-outlined text-3xl">
              admin_panel_settings
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[#111318] dark:text-white">
            Login with Phone Number
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Secure access for students
          </p>
        </div>

        <form className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#111318] dark:text-gray-200 ml-1">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 text-[20px]">
                  phone
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="tel"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                  placeholder="09123456789"
                  className="w-full rounded-lg border border-[#dbdee6] dark:border-gray-700 dark:bg-gray-800 dark:text-white h-12 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400"
                />
                <button
                  type="button"
                  className="text-sm text-primary font-bold hover:underline hover:text-primary/80 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:no-underline"
                  onClick={handleSendOTP}
                  disabled={phoneNumber.length !== 11 || isVerified}
                >
                  SEND OTP
                </button>
              </div>
            </div>
          </div>{" "}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#111318] dark:text-gray-200 ml-1">
              OTP
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 text-[20px]">
                  lock
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="tel"
                  disabled={(phoneNumber.length !== 11) ? true : false}
                  onChange={(e) => setCode(e.target.value)}
                  value={code}
                  placeholder="123456"
                  className="w-full rounded-lg border border-[#dbdee6] dark:border-gray-700 dark:bg-gray-800 dark:text-white h-12 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400"
                />
                <button
                  type="button"
                  disabled={code.length !== 6 || isVerified}
                  className="text-sm text-primary font-bold hover:underline hover:text-primary/80 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:no-underline"
                  onClick={handleVerifyOTP}
                >
                  VERIFY OTP
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#111318] dark:text-gray-200 ml-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 text-[20px]">
                  person
                </span>
              </div>
              <input
                type="text"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                required
                placeholder="Juan Dela Cruz"
                className="w-full rounded-lg border border-[#dbdee6] dark:border-gray-700 dark:bg-gray-800 dark:text-white h-12 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          </div>
          {isVerified && (
            <button
              type="submit"
              onClick={handleStudentContent}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-6 rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>LOGIN</span>
              <span className="material-symbols-outlined text-lg">login</span>
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
