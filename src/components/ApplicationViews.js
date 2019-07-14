import { Route } from 'react-router-dom'
import React, { Component } from "react"
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import AnimalList from './Animals/AnimalList'
import OwnerList from './Owners/ownerList';

class ApplicationViews extends Component {
    employeesFromAPI = [
        { id: 1, name: "Jessica Younker" },
        { id: 2, name: "Jordan Nelson" },
        { id: 3, name: "Zoe LeBlanc" },
        { id: 4, name: "Blaise Roberts" }
    ]

    locationsFromAPI = [
        { id: 1, name: "Nashville North", address: "500 Circle Way" },
        { id: 2, name: "Nashville South", address: "10101 Binary Court" },
        { id: 3, name: "Nashville Easty", address: "420 Blaze Trail"}
    ]

    animalsFromAPI = [
        { id: 1, name: "Doodles" },
        { id: 2, name: "Jack" },
        { id: 3, name: "Angus" },
        { id: 4, name: "Henley" },
        { id: 5, name: "Derkins" },
        { id: 6, name: "Checkers" }
    ]
    ownersFromAPI = [
        { id: 1, name: "Terry Tomlin", phone: "615-668-9954" },
        { id: 2, name: "Susan Susie", phone: "615-668-9954" },
        { id: 3, name: "Jack Jackson", phone: "615-668-9954" },
        { id: 4, name: "Sally Sindy", phone: "615-668-9954" }
    ]

    state = {
        employees: this.employeesFromAPI,
        locations: this.locationsFromAPI,
        animals: this.animalsFromAPI,
        owners: this.ownersFromAPI
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    // console.log("props: ", props);
                    // console.log("this.props: ", this.props);
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route path="/employees" render={(props) => {
                    return <EmployeeList employees={this.state.employees} />
                }} />
                <Route path="/animals" render={(props) => {
                    return <AnimalList animals={this.state.animals} />
                }} />
                <Route path="/owners" render={(props) => {
                    return <OwnerList owners={this.state.owners} />
                }} />
            </React.Fragment>
        )
    }
}

export default ApplicationViews
