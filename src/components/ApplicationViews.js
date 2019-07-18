import { Route, Redirect } from "react-router-dom";
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
import Login from "./authentication/Login";
import Employee from "./employee/employeeDetail";
import LocationDetails from "./location/LocationDetails";
import OwnerDetails from "./Owners/OwnerDetails";
import OwnerManager from "./Owners/OwnerManager";
import AnimalEditForm from "./Animals/AnimalEditForm";

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
  // Check if credentials are in local storage
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

  //     DELETE ANIMAL FETCHING---
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
  //       DELETING EMPLOYEES---
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
  // ADDING THE NEW PETS INTO THE APP
  addAnimal = animal =>
    AnimalManager.post(animal)
      .then(() => AnimalManager.getAll())
      .then(animals =>
        this.setState({
          animals: animals
        })
      );
  updateAnimal = editedAnimalObject => {
    return AnimalManager.put(editedAnimalObject)
      .then(() => AnimalManager.getAll())
      .then(animals => {
        this.setState({
          animals: animals
        });
      });
  };
  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            if (this.isAuthenticated()) {
              return <LocationList locations={this.state.locations} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          path="/locations/:locationId(\d+)"
          render={props => {
            let location = this.state.locations.find(
              location =>
                location.id === parseInt(props.match.params.locationId)
            );
            if (!location) {
              location = { id: 404, name: "404", location: "No one" };
            }

            return <LocationDetails location={location} />;
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
        <Route
          exact
          path="/employees"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <EmployeeList
                  deleteEmployee={this.deleteEmployee}
                  animals={this.state.animals}
                  employees={this.state.employees}
                  {...props}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
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
            if (this.isAuthenticated()) {
              return (
                <AnimalList
                  {...props}
                  deleteAnimal={this.deleteAnimal}
                  animals={this.state.animals}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          exact
          path="/animals/:animalId(\d+)"
          render={props => {
            return (
              <AnimalDetail
                {...props}
                deleteAnimal={this.deleteAnimal}
                animals={this.state.animals}
              />
            );
          }}
        />
        <Route
          path="/animals/:animalId(\d+)/edit"
          render={props => {
            return (
              <AnimalEditForm
                {...props}
                employees={this.state.employees}
                updateAnimal={this.updateAnimal}
              />
            );
          }}
        />
        <Route
          exact
          path="/owners"
          render={props => {
            if (this.isAuthenticated()) {
              return <OwnerList owners={this.state.owners} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          path="/owners/:ownerId(\d+)"
          render={props => {
            let owner = this.state.owners.find(
              owner => owner.id === parseInt(props.match.params.ownerId)
            );
            if (!owner) {
              owner = { id: 404, name: "404", owner: "No one" };
            }
            return <OwnerDetails owner={owner} />;
          }}
        />
        <Route path="/login" component={Login} />
      </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews);
