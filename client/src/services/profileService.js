import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; // Adjust the import according to your file structure

export const uploadProfilePicture = async (file) => {
  const storageRef = ref(storage, `profilePictures/${file.name}`);
  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url; // Return the download URL
  } catch (error) {
    throw new Error("Failed to upload profile picture: " + error.message);
  }
};

export const uploadCoverPhoto = async (file) => {
  const storageRef = ref(storage, `coverPhotos/${file.name}`);
  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url; // Return the download URL
  } catch (error) {
    throw new Error("Failed to upload cover photo: " + error.message);
  }
};
