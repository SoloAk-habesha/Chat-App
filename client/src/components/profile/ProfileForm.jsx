// ProfileForm.js
import React from "react";
import InputField from "../InputField";
import TextAreaField from "../TextAreaField";
import { formatDate } from "../../utils/formatDate";

const ProfileForm = ({ editedUser, setEditedUser, onSaveChanges }) => {
  return (
    <div className="px-4 mt-8 ">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        <InputField
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          label="Full name"
          value={editedUser.name || ""}
          onChange={(e) =>
            setEditedUser({ ...editedUser, name: e.target.value })
          }
        />
        <InputField
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          label="Email address"
          value={editedUser.email || ""}
          onChange={(e) =>
            setEditedUser({ ...editedUser, email: e.target.value })
          }
        />
        <InputField
          id="phone"
          name="phone"
          type="text"
          label="Phone number"
          placeholder="Phone"
          value={editedUser.phone || ""}
          onChange={(e) =>
            setEditedUser({ ...editedUser, phone: e.target.value })
          }
        />

        <InputField
          id="dateOfBirth"
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
          value={formatDate(editedUser.dateOfBirth)}
          onChange={(e) =>
            setEditedUser({
              ...editedUser,
              dateOfBirth: new Date(e.target.value),
            })
          }
        />

        <TextAreaField
          id="biography"
          name="biography"
          label="Biography"
          type="textarea"
          placeholder="Let the world know who you are"
          rows={5}
          value={editedUser.biography || ""}
          onChange={(e) =>
            setEditedUser({ ...editedUser, biography: e.target.value })
          }
        />
      </div>
      <button
        onClick={onSaveChanges}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ProfileForm;
