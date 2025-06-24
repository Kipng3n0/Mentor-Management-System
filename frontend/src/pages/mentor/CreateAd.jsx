import React, { useState } from 'react';

const CreateAd = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    profession: '',
    availability: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
    
      const token = localStorage.getItem("accessToken");


    try {
      const res = await fetch("http://localhost:3001/api/ads/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        },
         
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
          alert('Ad created successfully!');
          setFormData({
            title: "",
            description: "",
            location: "",
            profession: "",
            availability: "",
          });
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Ad creation failed:', error);
      alert('Failed to create ad.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-white  bg-zinc-700 rounded-3xl border border-yellow-500">
      <h2 className="text-2xl font-semibold mb-4">Create Mentor Ad</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full px-3 bg-zinc-500 py-2 border rounded-lg placeholder-white"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full px-3 py-2 border bg-zinc-500 rounded-lg text-white"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location (e.g. Tel Aviv)"
          className="w-full px-3 py-2 bg-zinc-500 border rounded-lg"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="profession"
          placeholder="Profession (e.g. Software Engineer)"
          className="w-full px-3 py-2 bg-zinc-500 border rounded-lg"
          value={formData.profession}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="availability"
          placeholder="Availability (e.g. Mon-Fri, 10AM-3PM)"
          className="w-full px-3 py-2 bg-zinc-500 border rounded-lg"
          value={formData.availability}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post Ad
        </button>
      </form>
    </div>
  );
};

export default CreateAd;
