import { useState } from "react";
import bgImage from "../assets/images/contactusf.jpg"; // optional bg

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    alert("Thank you for your feedback! ❤️");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div
      className="min-h-screen pt-24 flex justify-center items-center px-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="
          w-full max-w-4xl p-10 rounded-3xl 
          bg-white/20 backdrop-blur-2xl 
          border border-white/40 shadow-2xl
          float-animation
        "
      >
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT — CONTACT INFO */}
          <div className="space-y-6 text-gray-900">
            <h2 className="text-2xl font-semibold">Get in Touch</h2>

            <p>📧 <b>Email:</b> support@proappoint.com</p>
            <p>📞 <b>Phone:</b> +91 98765 43210</p>
            <p>📍 <b>Location:</b> India</p>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
              <div className="flex gap-4 text-2xl">
                <a href="#" className="hover:text-blue-600">🔗</a>
                <a href="#" className="hover:text-pink-600">📸</a>
                <a href="#" className="hover:text-sky-600">🐦</a>
                <a href="#" className="hover:text-gray-800">💼</a>
              </div>
            </div>
          </div>

          {/* RIGHT — FEEDBACK FORM */}
          <div className="bg-white/40 p-6 rounded-2xl shadow-inner">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Send Feedback
            </h2>

            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-3 rounded-xl border bg-white/60 outline-none"
            />

            <input
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-3 rounded-xl border bg-white/60 outline-none"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 rounded-xl border bg-white/60 outline-none"
            ></textarea>

            <button
              onClick={submitForm}
              className="
                w-full py-3 rounded-xl text-white font-semibold
                bg-blue-600 hover:bg-blue-700
                shadow-lg transition-all
              "
            >
              Send Message
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
