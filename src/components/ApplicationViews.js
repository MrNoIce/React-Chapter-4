import { Route } from "react-router-dom";
import React, { Component } from "react";
import { withRouter } from "react-router";
import LocationList from "./location/LocationList";
import EmployeeList from "./employee/EmployeeList";
import AnimalList from "./Animals/AnimalList";
import AnimalDetail from "./Animals/animalDetail";
import OwnerList from "./Owners/ownerList";
import AnimalManager from "../Modules/AnimalManager";
import employeeManager from "./employee/employeeManager";
import AnimalForm from "./Animals/AnimalForm";
import Employee from "./employee/employeeDetail";

class ApplicationViews extends Component {
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
      .then(AnimalManager.getAll)
      .then(animals => {
        this.props.history.push("/animals");
        this.setState({ animals: animals });
      });
  };

  fireEmployee = id => {
    return fetch(`http://localhost:5002/employees/${id}`, {
      method: "DELETE"
    })
      .then(employeeManager.getAll)
      .then(employees => {
        this.props.history.push("/employees");
        this.setState({ employees: employees });
      });
  };

  addAnimal = animal =>
    AnimalManager.post(animal)
      .then(() => AnimalManager.getAll())
      .then(animals =>
        this.setState({
          animals: animals
        })
      );

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return <LocationList locations={this.state.locations} />;
          }}
        />
        <Route
          path="/animals/new"
          render={props => {
            return (
              <AnimalForm
                {...props}
                addAnimal={this.addAnimal}
                employees={this.state.employees}
              />
            );
          }}
        />
        <Route exact
          path="/employees"
          render={props => {
            return (
              <EmployeeList
                fireEmployee={this.fireEmployee}
                employees={this.state.employees}
              />
            );
          }}
        />
        <Route
          path="/employees/:employeeId(\d+)"
          render={props => {
            let employee = this.state.employees.find(
              employee =>
                employee.id === parseInt(props.match.params.employeeId)
            );
            if (!employee) {
              employee = { id: 404, name: "404", employee: "No one" };
            }

            return (
              <Employee employee={employee} fireEmployee={this.fireEmployee} />
            );
          }}
        />
        <Route
          exact
          path="/animals"
          render={props => {
            return (
              <AnimalList
                {...props}
                deleteAnimal={this.deleteAnimal}
                animals={this.state.animals}
              />
            );
          }}
        />
        <Route
          path="/animals/:animalId(\d+)"
          render={props => {
            // Find the animal with the id of the route parameter
            let animal = this.state.animals.find(
              animal => animal.id === parseInt(props.match.params.animalId)
            );
            // If the animal wasn't found, create a default one
            if (!animal) {
              animal = { id: 404, name: "404", breed: "Dog not found" };
            }

            return (
              <AnimalDetail
                animal={animal}
                dischargeAnimal={this.deleteAnimal}
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

export default withRouter(ApplicationViews);
