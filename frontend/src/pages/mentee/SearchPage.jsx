import React, { useState } from "react";
import MapSearch from "../components/MapSearch";

const SearchPage = () => {
  const [location, setLocation] = useState(null);

  const handleSelectLocation = (location) => {
    setLocation(location);
    console.log("Selected Location:", location);
    // TODO: Send location.lat/lng to backend API to filter mentor ads
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Search Mentors by Location</h1>
      <MapSearch onSelectLocation={handleSelectLocation} />
      {location && (
        <div className="mt-4 text-sm text-gray-700">
          Selected: {location.name} ({location.lat.toFixed(2)},{" "}
          {location.lng.toFixed(2)})
        </div>
      )}
    </div>
  );
};

export default SearchPage;
