import React, { useState } from "react";
import axios from "axios";

const ContructForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const BACKEND_URL ="https://portfolio4-backend.vercel.app";
  console.log(BACKEND_URL)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is not valid";

    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10,15}$/.test(formData.phone))
      newErrors.phone = "Phone must be 10–15 digits";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSuccess("");
    setErrors({});

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/user/userCreate`,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        setSuccess("✅ Submitted successfully!");
        alert("Data sent to backend!");
        setFormData({ name: "", email: "", phone: "" });
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setErrors({
        general: err.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="ContructForm"
      className="min-h-screen px-3 w-[80%] mx-auto  py-19 grid md:grid-cols-2 justify-center items-center bg-gray-900 text-white"
    >
      <div className="p-10 rounded-2xl ">
        <img className="rounded-2xl w-full" src="meIphone.png" alt="my pic" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 py-20 px-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>

        {errors.general && (
          <p className="text-red-500 text-sm mb-2">{errors.general}</p>
        )}
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

        {/* Name */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 rounded bg-gray-700 border ${
              errors.name ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:border-green-500`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 rounded bg-gray-700 border ${
              errors.email ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:border-green-500`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-3 rounded bg-gray-700 border ${
              errors.phone ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:border-green-500`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded bg-green-500 hover:bg-green-600 text-white font-semibold disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ContructForm;
