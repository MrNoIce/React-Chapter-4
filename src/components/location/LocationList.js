import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./location.css";

export default class LocationList extends Component {
  render() {
    return (
      <section className="locations">
        {this.props.locations.map(location => (
          <div key={location.id} className="card">
            {location.name}
            <div className="card-body">
              <div className="card-title">
                {/* <img src={dog} className="icon--dog" alt="dog" /> */}
                <h5>{location.name}</h5>
                <Link className="nav-link" to={`/locations/${location.id}`}>
                  Details
                </Link>

                <button>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }
}
