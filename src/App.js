import React from "react";
import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import { geolocated } from "react-geolocated";
import "./App.css";
const DEFAULT_LATITUDE = 0;
const DEFAULT_LANGITUDE = 0;
class App extends React.Component {
  render() {
    
    return !this.props.isGeolocationAvailable ? (
      <div className="center">Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div className="center">Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <MapContainer
        center={[this.props.coords.latitude, this.props.coords.longitude]}
        zoom={2}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[this.props.coords.latitude, this.props.coords.longitude]}
        >
          <Popup>I am here.</Popup>
        </Marker>
      </MapContainer>
    ) : (
      <div className="center"> Loading.. </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
