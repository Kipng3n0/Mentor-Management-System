import { GoogleMap, useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const defaultCenter = {
  lat: 31.0461,
  lng: 34.8516,
};

const MapSearch = ({ onSelectLocation }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const location = {
        name: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setMapCenter({ lat: location.lat, lng: location.lng });
      onSelectLocation && onSelectLocation(location);
    }
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Search city or region"
          className="w-full px-4 py-2 border rounded mb-4"
        />
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={8}
      />
    </div>
  );
};

export default MapSearch;
