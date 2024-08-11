import React from "react";

const ProfileImages = ({
  userData,
  handleCoverPhotoChange,
  handleProfilePictureChange,
}) => {
  return (
    <div className="bg-white w-full dark:bg-gray-800  shadow-md">
      <div className="relative">
        <img
          src={
            userData.coverPhoto ||
            "https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form1.jpg"
          }
          alt="Cover"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50 " />
        <div className="absolute top-4 right-4 cursor-pointer text-xs text-gray-100">
          <label htmlFor="coverPhoto" className="cursor-pointer">
            Change Cover Photo
          </label>
          <input
            id="coverPhoto"
            type="file"
            name="coverPhoto"
            accept="image/*"
            className="hidden"
            onChange={handleCoverPhotoChange}
          />
        </div>
        <div className="absolute bottom-0 -mb-12 left-12">
          <img
            src={
              userData.profilePicture ||
              "https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form2.jpg"
            }
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover shadow"
          />
          <div className="absolute inset-0 bg-black opacity-50 rounded-full z-10 flex items-center justify-center text-gray-100 cursor-pointer">
            <label htmlFor="profilePicture" className="cursor-pointer text-xs">
              Edit Picture
            </label>
            <input
              id="profilePicture"
              type="file"
              name="profilePicture"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImages;
