import React, { useState } from "react";
import { searchAds } from "../../api/adsApi";
import { submitAppointment } from "../../api/appointmentApi";


const SearchAds = () => {
  const [filters, setFilters] = useState({
    profession: "",
    location: "",
    availability: "",
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await searchAds(filters);
      setResults(data);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  const handleRequestAppointment = async (mentorId) => {
    const confirmed = window.confirm(
      "Do you want to request an appointment with this mentor?"
    );
    if (!confirmed) return;

    const appointmentData = {
      date: new Date().toISOString().slice(0, 10), // today’s date
      time: "10:00", // or use a date picker later
      reason: "Interested in mentorship", // or prompt the user
      mentor: mentorId,
    };

    try {
      await submitAppointment(appointmentData);
      alert("Appointment requested successfully!");
    } catch (error) {
      alert(error.message);
    }
  };
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text text-white">
        Search Mentor Ads
      </h2>

      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
      >
        <input
          type="text"
          name="profession"
          placeholder="Profession"
          className="p-2 rounded bg-zinc-800 text-white"
          value={filters.profession}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="p-2 rounded bg-zinc-800 text-white"
          value={filters.location}
          onChange={handleChange}
        />
        <input
          type="text"
          name="availability"
          placeholder="Availability"
          className="p-2 rounded bg-zinc-800 text-white"
          value={filters.availability}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="col-span-1 sm:col-span-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div>
        {results.length > 0 ? (
          <div className="grid gap-4">
            {results.map((ad) => (
              <div
                key={ad._id}
                className="bg-zinc-700 p-4 rounded text-white border border-yellow-500"
              >
                <h3 className="text-xl font-semibold">{ad.title}</h3>
                <p>{ad.description}</p>
                <p className="text-sm text-gray-400">Location: {ad.location}</p>
                <p className="text-sm text-gray-400">
                  Availability: {ad.availability}
                </p>
                <p className="text-sm text-gray-400">
                  Profession: {ad.profession}
                </p>
                <p className="text-sm mt-2 text-purple-300">
                  Mentor: {ad.userId?.name} ({ad.userId?.email})
                </p>
                <button
                  onClick={() => handleRequestAppointment(ad.userId._id)}
                  className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                >
                  Request Appointment
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No ads found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchAds;
