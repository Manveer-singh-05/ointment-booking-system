import { useState } from "react";
import axios from "axios";

export default function EditProfileModal({ user, onClose, onUpdate }) {

  const defaultPhoto = "https://cdn-icons-png.flaticon.com/512/848/848006.png";

  // Build correct preview path
  const initialPreview =
    user?.photo
      ? (user.photo.startsWith("http") 
          ? user.photo 
          : `http://localhost:4000${user.photo}`)
      : defaultPhoto;

  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [photo, setPhoto] = useState(null);
  const [removePhoto, setRemovePhoto] = useState(false);
  const [preview, setPreview] = useState(initialPreview);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("bio", bio);
    formData.append("removePhoto", removePhoto);

    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const res = await axios.put(
        "http://localhost:4000/auth/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updated = res.data.user;

      // Build full photo URL only if photo exists
      if (updated.photo) {
        updated.photo =
          updated.photo.startsWith("http")
            ? updated.photo
            : `http://localhost:4000${updated.photo}`;
      }

      // Store updated user in localStorage
      localStorage.setItem("user", JSON.stringify(updated));

      onUpdate(updated);
      onClose();

    } catch (err) {
      console.log("Upload Error:", err);
      alert("Profile update failed!");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setRemovePhoto(false);
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemovePhoto = () => {
    setRemovePhoto(true);
    setPhoto(null);
    setPreview(defaultPhoto);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-xl animate-fadeUp">

        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          <div>
            <label className="font-medium">Name</label>
            <input
              className="w-full p-2 border rounded-lg mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="font-medium">Phone</label>
            <input
              className="w-full p-2 border rounded-lg mt-1"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* BIO */}
          <div>
            <label className="font-medium">Bio</label>
            <textarea
              className="w-full p-2 border rounded-lg mt-1"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          {/* PHOTO UPLOAD */}
          <div>
            <label className="font-medium">Profile Photo</label>

            <div className="flex items-center gap-4 mt-2">
              <img
                src={preview}
                className="w-20 h-20 rounded-full object-cover border shadow"
              />

              <label
                htmlFor="photoUpload"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition"
              >
                Choose File
              </label>

              <input
                type="file"
                id="photoUpload"
                className="hidden"
                onChange={handlePhotoChange}
              />

              {/* REMOVE BUTTON */}
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
