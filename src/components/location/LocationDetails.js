import React, { Component } from "react";
import "./location.css";


export default class LocationDetails extends Component {
  state = {
    saveDisabled: false
  };

  render() {
    return (
      <section className="location">
        <div key={this.props.id} className="card">
          <div className="card-body">
            <h4 className="card-title">
              {/* <img src={dog} className="icon--dog" alt="doggo" /> */}
              {this.props.location.name}
            </h4>
            <h6 className="card-title">{this.props.location.address}</h6>
            <h6 className="card-title">{this.props.location.phone}</h6>
            <button
              onClick={() => {
                this.setState({ saveDisabled: true }, () =>
                  this.props.dischargeAnimal(this.props.location.id)
                );
              }}
              disabled={this.state.saveDisabled}
              className="card-link"
            >
              Delete
            </button>
          </div>
        </div>
      </section>
    );
  }
}
