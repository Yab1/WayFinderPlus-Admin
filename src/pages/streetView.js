import { useEffect, useState, useContext } from "react";
import { MapContext } from "../contexts/MapContext";
import mapboxgl from "mapbox-gl";
import decodeCoordinates from "../functions/decodeCoordinates";
import createMarker from "../functions/createMarker";
import StyledCard from "../shared/card";
import ShowCard from "../shared/showCard";

function StreetView() {
  // States
  const [map, setMap] = useState(null);
  const [decodedBuildingData, setDecodedBuildingData] = useState([]);
  const [clickedMarkerId, setClickedMarkerId] = useState(null);

  // For conditional rendering
  const [markers, setMarkers] = useState([]);
  const [showCard, setShowCard] = useState(false);

  // Context
  const { buildingsData } = useContext(MapContext);

  const closeCard = () => {
    setShowCard(!showCard);
  };

  const handleMarkerClick = (markerId) => {
    setClickedMarkerId(markerId);
    setShowCard(!showCard);
  };

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN;
    const mapBox = new mapboxgl.Map({
      container: "mapBox",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [39.29039343419677, 8.563261132878523],
      zoom: 16,
    });
    const decodedData = decodeCoordinates(buildingsData);
    setDecodedBuildingData([...decodedData]);
    setMap(mapBox);
    return () => {
      mapBox.remove();
      markers.forEach((marker) => marker.remove());
    };
  }, [buildingsData]);

  useEffect(() => {
    if (markers && map && decodedBuildingData.length > 0) {
      markers.forEach((marker) => marker.remove());
      const newMarkers = createMarker(
        map,
        decodedBuildingData,
        handleMarkerClick
      );
      setMarkers(newMarkers);
    }
  }, [decodedBuildingData]);

  return (
    <StyledCard>
      {showCard && (
        <ShowCard
          clickedMarkerId={clickedMarkerId}
          buildingsData={buildingsData}
          closeCard={closeCard}
          handleMarkerClick={handleMarkerClick}
        />
      )}
      <div id="mapBox" style={{ minWidth: "100%", minHeight: "100%" }}></div>
    </StyledCard>
  );
}
export default StreetView;
