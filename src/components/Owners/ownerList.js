import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./owners.css"

export default class OwnerList extends Component {
  render() {
    return (
      <section className="owners">
        {this.props.owners.map(owner => (
          <div key={owner.id} className="card">
            <h3>{owner.name}</h3>
            <div className="card-body">
              <div className="card-title">
                {/* <img src={dog} className="icon--dog" alt="dog" /> */}
                <h5>{owner.name}</h5>
                <Link className="nav-link" to={`/owners/${owner.id}`}>
                  Details
                </Link>
                <button
                // onClick={() => this.props.deleteAnimal(owner.id)}
                // className="card-link"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }
}
