import { useState } from "react";
import axios from "axios";

export default function EditProfileModal({ user, onClose, onUpdate }) {
  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("bio", bio);
    if (photo) formData.append("photo", photo);

    try {
      const res = await axios.put(
        "http://localhost:4000/auth/update-profile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      onUpdate(res.data.user);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="font-medium">Name</label>
            <input
              className="w-full p-2 border rounded-lg mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium">Phone</label>
            <input
              className="w-full p-2 border rounded-lg mt-1"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium">Bio</label>
            <textarea
              className="w-full p-2 border rounded-lg mt-1"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium">Profile Photo</label>
            <input
              type="file"
              className="w-full mt-1"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
