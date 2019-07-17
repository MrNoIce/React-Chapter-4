import React, { Component } from "react";
import "./owners.css";

export default class OwnerDetails extends Component {
  state = {
    saveDisabled: false
  };
//  DETAIL BUTTON EVENT HANDLER
  render() {
    return (
      <section className="owner">
        <div key={this.props.owner.id} className="card">
          <div className="card-body">
            <h4 className="card-title">{this.props.owner.name}</h4>
            <h6 className="card-title">Phone: {this.props.owner.phone}</h6>
            <h6 className="card-title">Social: {this.props.owner.social}</h6>
            <h6 className="card-title">Address: {this.props.owner.address}</h6>
            <button
              onClick={() => {
                this.setState({ saveDisabled: true }, () =>
                  this.props.fireEmployee(this.props.employee.id)
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
