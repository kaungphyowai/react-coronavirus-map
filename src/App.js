import React from "react";
import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import "./App.css";
const DEFAULT_LATITUDE = 0;
const DEFAULT_LONGITUDE = 0;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  async componentDidMount() {
    const url = "https://corona.lmao.ninja/v3/covid-19/countries";
    const finalData = await fetch(url).then((response) => response.json());
    this.setState({ data: finalData });
  }
  render() {
    return (
      <MapContainer
        center={[DEFAULT_LATITUDE, DEFAULT_LONGITUDE]}
        zoom={2}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.data.length > 0 &&
          this.state.data.map(function (data) {
            return (
              <Marker
                position={[data.countryInfo.lat, data.countryInfo.long]}
                key={data.country}
              >
                <Popup>
                  <img
                    src={data.countryInfo.flag}
                    alt={data.country + " flag"}
                    width="200"
                    height="100"
                  />
                  <h2>{data.country}</h2>
                  <h3 style={{ color: "red" }}>
                    TodayCases😷️: {data.todayCases}
                  </h3>
                  <h4 style={{ color: "red" }}>active🤒️: {data.active}</h4>
                  <h4 style={{ color: "red" }}>critical⚠️: {data.critical}</h4>
                  <h4 style={{ color: "green" }}>
                    recovered😍️: {data.recovered}
                  </h4>
                  <h4>deaths😥️: {data.deaths}</h4>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    );
  }
}

export default App;
