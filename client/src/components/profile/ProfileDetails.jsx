// ProfileDetails.js
import React from "react";
import ProfileImages from "./ProfileImages";
import { formatDate } from "../../utils/formatDate";
import { calculateAge } from "../../utils/calculateAge";

const ProfileDetails = ({
  user,
  onCoverPhotoChange,
  onProfilePictureChange,
}) => (
  <>
    <ProfileImages
      userData={user}
      handleCoverPhotoChange={onCoverPhotoChange}
      handleProfilePictureChange={onProfilePictureChange}
    />
    <div className="mt-14">
      <ul
        role="list"
        className="divide-y grid gap-x-4 sm:grid-cols-1 md:grid-cols-2  divide-gray-300 dark:divide-gray-700"
      >
        <li className="py-2  hover:bg-gray-300 dark:hover:bg-gray-700  transition-colors">
          <div className="flex items-center px-6 space-x-4">
            <div className="flex-shrink-0">
              <i className="fa-regular fa-user text-gray-700 dark:text-gray-300"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white overflow-wrap break-words">
                {user.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Full name
              </p>
            </div>
          </div>
        </li>
        <li className="py-2  hover:bg-gray-300 dark:hover:bg-gray-700  transition-colors">
          <div className="flex items-center px-6 space-x-4">
            <div className="flex-shrink-0">
              <i className="fa-regular fa-envelope text-gray-700 dark:text-gray-300"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white overflow-wrap break-words">
                {user.email}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
            </div>
          </div>
        </li>
        <li className="py-2 hover:bg-gray-300 dark:hover:bg-gray-700  transition-colors">
          <div className="flex items-center h-8 px-6 space-x-4">
            <div className="flex-shrink-0">
              <i className="fa-solid fa-key text-gray-700 dark:text-gray-300"></i>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Password
            </p>
          </div>
        </li>
        <li className="py-2 hover:bg-gray-300 dark:hover:bg-gray-700  transition-colors">
          <div className="flex items-center h-8 px-6 space-x-4">
            <div className="flex-shrink-0">
              <i className="fa-regular fa-calendar text-gray-700 dark:text-gray-300"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white overflow-wrap break-words">
                {user.dateOfBirth ? formatDate(user.dateOfBirth) : null} (
                {calculateAge(user.dateOfBirth)} years old)
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Date of Birth
              </p>
            </div>
          </div>
        </li>
        <li className="py-2 hover:bg-gray-300 dark:hover:bg-gray-700  transition-colors">
          <div className="flex items-center px-6 space-x-4">
            <div className="flex-shrink-0">
              <i className="fa-solid fa-phone text-gray-700 dark:text-gray-300"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white overflow-wrap break-words">
                {user.phone}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Phone number
              </p>
            </div>
          </div>
        </li>
        <li className="py-2 hover:bg-gray-300 dark:hover:bg-gray-700  transition-colors">
          <div className="flex items-center px-6 space-x-4">
            <div className="flex-shrink-0">
              <i className="fa-regular fa-user text-gray-700 dark:text-gray-300"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium  p-4 rounded-lg text-gray-900 dark:text-white overflow-wrap break-words">
                {user.biography}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Biography
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </>
);

export default ProfileDetails;
