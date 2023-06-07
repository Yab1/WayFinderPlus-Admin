import { useState } from "react";
import { MapContext } from "../contexts/MapContext";
import CustomData from "../components/customData";
import createMarker from "../functions/createMarker";

function StreetView() {
  const [marker, setMarker] = useState(null);
  const [locations, setLocations] = useState([]);

  const handleLocation = (id, map, latitude, longitude) => {
    setLocations((prevLocation) => {
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
    console.log(locations);
  };

  return (
    <MapContext.Consumer>
      {(context) => {
        const { buildingsData } = context;
        return (
          <CustomData
            buildingsData={buildingsData}
            handleLocation={handleLocation}
          />
        );
      }}
    </MapContext.Consumer>
  );
}

export default StreetView;
