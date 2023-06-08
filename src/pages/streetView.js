import { useEffect, useState } from "react";
import { MapContext } from "../contexts/MapContext";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import CustomData from "../components/customData";
import createMarker from "../functions/createMarker";

import StyledCard from "../shared/card";

function StreetView() {
  const [map, setMap] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [markers, setMarkers] = useState([]);

  const handleMarkers = function (pin) {
    setMarkers(pin);
  };

  const handleCoordinates = (id, latitude, longitude) => {
    map &&
      setCoordinates((prevLocation) => {
        return [
          ...prevLocation,
          {
            id: id,
            map: map,
            latitude: latitude,
            longitude: longitude,
          },
        ];
      });
  };
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWZyb2hhYmVzaGEiLCJhIjoiY2xnb3F0cDYzMGYzNjNlb2d2dXhtdzRqbSJ9.JW2kyDZjoOWoXVPG5Giw7g";
    const mapBox = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v10",
      center: [39.29039343419677, 8.563261132878523],
      zoom: 16,
    });
    setMap(mapBox);
    createMarker(map, coordinates, handleMarkers);
    console.table(markers);
    return () => {
      mapBox.remove();
    };
  }, [coordinates]);

  return (
    <MapContext.Consumer>
      {(context) => {
        const { buildingsData } = context;
        return (
          <>
            <CustomData
              buildingsData={buildingsData}
              handleCoordinates={handleCoordinates}
            />
            <StyledCard>
              <div
                id="map"
                style={{ minWidth: "100%", minHeight: "100%" }}
              ></div>
            </StyledCard>
          </>
        );
      }}
    </MapContext.Consumer>
  );
}
export default StreetView;
