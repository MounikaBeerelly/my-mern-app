import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {student: []};
    }
    componentDidMount(){
      axios.get('http://localhost:5001/student')
        .then(response => {
            console.log(response)
          this.setState({ student: response.data });
          console.log(this.state.student);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    tabRow(){
          console.log(this.state.student)
      return this.state.student.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }

    render() {
      return (
        <div>
          <h3 align="center">Student List</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Student_ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Email</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      );
    }
  }