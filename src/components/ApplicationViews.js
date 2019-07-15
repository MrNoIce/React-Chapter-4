import { Route } from "react-router-dom";
import React, { Component } from "react";
import LocationList from "./location/LocationList";
import EmployeeList from "./employee/EmployeeList";
import AnimalList from "./Animals/AnimalList";
import OwnerList from "./Owners/ownerList";

export default class ApplicationViews extends Component {
  state = {
    locations: [],
    animals: [],
    employees: [],
    owners: []
  };

  componentDidMount() {
    const newState = {};

    fetch("http://localhost:5002/animals")
      .then(r => r.json())
      .then(animals => (newState.animals = animals))
      .then(() => fetch("http://localhost:5002/employees").then(r => r.json()))
      .then(employees => (newState.employees = employees))
      .then(() => fetch("http://localhost:5002/owners").then(r => r.json()))
      .then(owners => (newState.owners = owners))
      .then(() => fetch("http://localhost:5002/locations").then(r => r.json()))
      .then(locations => (newState.locations = locations))
      .then(() => this.setState(newState));
  }

  deleteAnimal = id => {
    return fetch(`http://localhost:5002/animals/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => fetch(`http://localhost:5002/animals`))
      .then(e => e.json())
      .then(animals =>
        this.setState({
          animals: animals
        })
      );
  };

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            // console.log("props: ", props);
            // console.log("this.props: ", this.props);
            return <LocationList locations={this.state.locations} />;
          }}
        />
        <Route
          path="/employees"
          render={props => {
            return <EmployeeList employees={this.state.employees} />;
          }}
        />
        <Route
          exact
          path="/animals"
          render={() => {
            return (
              <AnimalList
                deleteAnimal={this.deleteAnimal}
                animals={this.state.animals}
              />
            );
          }}
        />
        <Route
          path="/owners"
          render={props => {
            return <OwnerList owners={this.state.owners} />;
          }}
        />
      </React.Fragment>
    );
  }
}
