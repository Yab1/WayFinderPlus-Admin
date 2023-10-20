import mapboxgl from "mapbox-gl";

function addPin(map, lng, lat) {
  const existingPin = document.querySelector("#pin");

  if (existingPin) {
    existingPin.remove();
  }
  map.flyTo({
    center: [lng, lat],
    zoom: 20,
    essential: true,
  });

  const pin = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

  pin.getElement().id = "pin";
}

export default addPin;
