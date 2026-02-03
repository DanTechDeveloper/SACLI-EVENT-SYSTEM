import { useState } from "react";
import AuthAdmin from "./AuthAdmin";
import { useNavigate } from "react-router-dom";

export default function AuthHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#dbdee6] dark:border-gray-800 bg-white dark:bg-background-dark px-6 md:px-10 py-3 z-10">
        <div className="flex items-center gap-3 text-[#111318] dark:text-white">
          <div className="size-6 text-primary">
            <span className="material-symbols-outlined text-3xl">school</span>
          </div>
          <h2 className="text-[#111318] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            SACLI EVENT SYSTEM
          </h2>
        </div>
        <button
          onClick={toggleModal}
          className="text-sm text-primary font-bold hover:underline cursor-pointer flex items-center gap-1"
        >
          <span className="material-symbols-outlined">
            admin_panel_settings
          </span>
          <span>Login as admin</span>
        </button>
      </header>

      {isModalOpen && <AuthAdmin toggleModal={toggleModal} />}
    </>
  );
}
