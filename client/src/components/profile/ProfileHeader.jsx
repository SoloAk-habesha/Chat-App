import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileHeader = ({
  isEditing,
  onEditToggle,
  onSignOut,
  onDeleteAccount,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="sticky top-0 right-0 bg-white dark:bg-gray-800 shadow-md z-20 p-4 flex items-center justify-between">
      <button onClick={handleBack} className="text-gray-700 dark:text-gray-300">
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
        Profile
      </h1>
      <div className="flex items-center space-x-8">
        <button
          onClick={onEditToggle}
          className="text-gray-700 dark:text-gray-300"
        >
          {isEditing ? (
            <i className="fa-solid fa-save"></i>
          ) : (
            <i className="fa-solid fa-pen"></i>
          )}
        </button>
        <div className="relative" ref={menuRef}>
          <button
            className="text-gray-700 dark:text-gray-300"
            onClick={() => setMenuVisible(!menuVisible)}
          >
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>
          {menuVisible && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-lg">
              <ul className="divide-y divide-gray-300 dark:divide-gray-700">
                <li>
                  <button
                    onClick={onSignOut}
                    className="w-full text-left px-4 py-2 text-sm flex gap-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i> Sign out
                  </button>
                </li>
                <li>
                  <button
                    onClick={onDeleteAccount}
                    className="flex gap-4 w-full text-left px-4 py-2 text-sm text-red-700 dark:text-red-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <i className="fa-solid fa-user-xmark"></i> Delete Account
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
