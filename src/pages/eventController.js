import { useEffect, useState, useContext } from "react";
import { MapContext } from "../contexts/MapContext";
import mapboxgl from "mapbox-gl";
import decodeCoordinates from "../functions/decodeCoordinates";
import createMarker from "../functions/createMarker";
import StyledCard from "../shared/card";
import EventEditor from "../shared/eventEditor";

function EventController() {
  // States
  const [map, setMap] = useState(null);
  const [decodedBuildingData, setDecodedBuildingData] = useState([]);
  const [clickedMarkerId, setClickedMarkerId] = useState(null);
  const [event, setEvent] = useState({
    geoHash: "",
    eventName: "",
    eventCategory: "",
    startDate: "",
    endDate: "",
    eventDescription: "",
  });

  // For conditional rendering
  const [markers, setMarkers] = useState([]);

  // Context
  const { buildingsData } = useContext(MapContext);

  const handleMarkerClick = (markerId) => {
    setClickedMarkerId(markerId);
  };
  const handleEvent = (data) => {
    setEvent(data);
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
      <div id="mapBox" style={{ minWidth: "100%", minHeight: "100%" }}></div>
      <EventEditor
        event={event}
        handleEvent={handleEvent}
        clickedMarkerId={clickedMarkerId}
      />
    </StyledCard>
  );
}
export default EventController;
