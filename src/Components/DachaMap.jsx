import { useState, useRef } from "react";
import { GoogleMap, LoadScript, Autocomplete, Marker, Circle, useLoadScript } from "@react-google-maps/api";

const libraries = ["places"]; // Static array qilib tashqarida yaratamiz

const mapContainerStyle = { height: "300px", width: "100%" };
const defaultCenter = { lat: 41.2995, lng: 69.2401 };

const DachaMap = ({ onLocationSelect }) => {
  const [coordinates, setCoordinates] = useState(defaultCenter);
  const autocompleteRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCGUri0Qf7oabhI-5bCvkhu4DkNJU1l6v4",
    libraries,
  });

  if (loadError) return <p>Google Maps yuklanmadi!</p>;
  if (!isLoaded) return <p>Yuklanmoqda...</p>;

  const onPlaceSelected = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.geometry) {
        const newCoordinates = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setCoordinates(newCoordinates);
        onLocationSelect(newCoordinates);
      } else {
        console.warn("No geometry data found for the selected place");
      }
    } else {
      console.warn("Autocomplete ref is not set properly");
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCoordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCoordinates(newCoordinates);
          onLocationSelect(newCoordinates);
        },
        (error) => console.error("Geolocation error:", error)
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCGUri0Qf7oabhI-5bCvkhu4DkNJU1l6v4" libraries={libraries}>
      <div style={{ }}>
        <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={onPlaceSelected}>
          <input type="text" placeholder="Dacha joyini qidiring..." style={{ width: "100%", padding: "10px", fontSize: "16px", zIndex: 1051 }} />
        </Autocomplete>
      </div>

      <button onClick={getCurrentLocation} type="button" style={{ margin: "10px", padding: "8px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>
        📍 Mening joylashuvimni olish
      </button>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={coordinates}
        zoom={14}
        onClick={(e) => {
          const newCoordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
          setCoordinates(newCoordinates);
          onLocationSelect(newCoordinates);
        }}
      >
        {coordinates && <Marker
          position={coordinates}
          draggable={true}
          onDragEnd={(e) => {
            const newCoordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
            setCoordinates(newCoordinates);
            onLocationSelect(newCoordinates);
          }}
        />}
        <Circle
          center={coordinates}
          radius={50} // 50 metr radius
          options={{ fillColor: "red", strokeColor: "red" }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default DachaMap;
