import React, { Component } from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";
const TOKEN =
  "pk.eyJ1IjoiamFrZXNjb3R0MSIsImEiOiJjanlrYjdqYmMwY3FhM2RsaTA4bHh5cjlvIn0.A41L1WQrcE5OVqQfc_-bbw";
const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 2.8,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500
      }
    };
  }
  render() {
    const { viewport } = this.state.viewport;
    return (
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={TOKEN}
      >
        <div className="nav" style={navStyle}>
          <NavigationControl/>
        </div>
      </ReactMapGL>
    );
  }
}
export default Map;
