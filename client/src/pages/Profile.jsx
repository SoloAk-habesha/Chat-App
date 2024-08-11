import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  deleteUser,
  fetchUser,
  signOutSuccess,
  uploadPhoto,
} from "../redux/user/userSlice";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileForm from "../components/profile/ProfileForm";
import ProfileDetails from "../components/profile/ProfileDetails";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import Alert from "../components/Alert";
import { FaSpinner } from "react-icons/fa";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [alert, setAlert] = useState({ message: "", type: "" });
  const dispatch = useDispatch();
  const {
    currentUser,
    loading: userLoading,
    imageLoading,
    error,
  } = useSelector((state) => state.user);

  if (!currentUser) {
    dispatch(fetchUser());
  }
  useEffect(() => {
    if (!currentUser) {
      dispatch(fetchUser());
    } else {
      setEditedUser({ ...currentUser });
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleEditToggle = async () => {
    if (isEditing) {
      await handleSaveChanges();
    } else {
      setIsEditing(!isEditing);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await dispatch(updateUser(editedUser));
      setAlert({ message: "Profile updated successfully!", type: "success" });
      setTimeout(() => {
        setIsEditing(false);
      }, 3000);
    } catch (error) {
      setAlert({ message: "Failed to update profile", type: "error" });
    }
  };

  const handleSignOut = () => {
    dispatch(signOutSuccess());
  };

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteUser());
      handleSignOut();
    } catch (error) {
      setAlert({ message: "Failed to delete account", type: "error" });
    }
  };

  const handlePhotoChange = async (event, type) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setAlert({ message: `Uploading ${type}...`, type: "info" });
        const storageRef = ref(storage, `${type}/${currentUser._id}`);

        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        await dispatch(uploadPhoto({ url: downloadURL, type }));
        setEditedUser((prevUser) => ({ ...prevUser, [type]: downloadURL }));
        setAlert({ message: `${type} updated successfully!`, type: "success" });
      } catch (error) {
        setAlert({
          message: `Failed to upload ${type}. Please try again.`,
          type: "error",
        });
      }
    }
  };

  if (userLoading || imageLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-gray-700" />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-gray-100">
      {alert.message && <Alert message={alert.message} type={alert.type} />}
      <ProfileHeader
        isEditing={isEditing}
        onEditToggle={handleEditToggle}
        onSignOut={handleSignOut}
        onDeleteAccount={handleDeleteAccount}
      />
      {isEditing ? (
        <ProfileForm
          editedUser={editedUser}
          setEditedUser={setEditedUser}
          onSaveChanges={handleSaveChanges}
        />
      ) : (
        <ProfileDetails
          user={currentUser}
          onCoverPhotoChange={(e) => handlePhotoChange(e, "coverPhoto")}
          onProfilePictureChange={(e) => handlePhotoChange(e, "profilePicture")}
        />
      )}
    </div>
  );
};

export default Profile;
