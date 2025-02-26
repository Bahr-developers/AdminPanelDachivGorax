import { useState } from "react";
import { GoogleMap, LoadScript, Autocomplete, Marker } from "@react-google-maps/api";

const mapContainerStyle = { height: "400px", width: "100%" };
const defaultCenter = { lat: 41.2995, lng: 69.2401 }; 

const DachaMap = ({ onLocationSelect }) => {
  const [coordinates, setCoordinates] = useState(defaultCenter);
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const onPlaceSelected = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const newCoordinates = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setCoordinates(newCoordinates);
        onLocationSelect(newCoordinates); 
      }
    }
  };

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCoordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCoordinates(newCoordinates);
          onLocationSelect(newCoordinates);
        },
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert("Brauzeringiz Geolocation-ni qo‘llab-quvvatlamaydi.");
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCOoxM7bD8Eg8G0lvGlE_xJOo1D5Yj5odY" libraries={["places"]}>
      <div>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceSelected}>
          <input type="text" placeholder="Dacha joyini qidiring..." style={{ width: "100%", padding: "10px", fontSize: "16px", border: "none", borderBottom: "1px solid black" }} />
        </Autocomplete>

        <button onClick={getCurrentLocation} type="button" style={{ margin: "10px", padding: "8px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>
          📍 Mening joylashuvimni olish
        </button>

        <GoogleMap
          key={coordinates.lat + coordinates.lng} 
          mapContainerStyle={mapContainerStyle}
          center={coordinates}
          zoom={14}
          onClick={(e) => {
            const newCoordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
            setCoordinates(newCoordinates);
            onLocationSelect(newCoordinates);
          }}
        >
          <Marker
            position={coordinates}
            draggable={true}
            onDragEnd={(e) => {
              const newCoordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
              setCoordinates(newCoordinates);
              onLocationSelect(newCoordinates);
            }}
          />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default DachaMap;
