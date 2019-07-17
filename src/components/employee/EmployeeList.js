import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./employee.jpg"
import "./employee.css";

//          EMPLOYEE LIST TAB DISPLAT HANDLER----

export default class EmployeeList extends Component {

  render() {
    return (
      <section className="employees">
        {this.props.employees.map(employee => (
          <div key={employee.id} className="card">
            <div className="card-body">
              <div className="card-title">
                <img src={employee.jpg} className="icon--dog" alt="dog" />
                <h5>{employee.name}</h5>
                <Link className="nav-link" to={`/employees/${employee.id}`}>
                  Details
                </Link>

                <button
                  onClick={() => this.props.fireEmployee(employee.id)}
                  className="card-link"
                >
                  FIRED
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }
}
