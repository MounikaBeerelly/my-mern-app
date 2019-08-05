
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.get('http://localhost:5001/student/delete/'+this.props.obj._id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.student_Id}
          </td>
          <td>
            {this.props.obj.name}
          </td>
          <td>
            {this.props.obj.address}
          </td>
          <td>
            <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
          </td>
          <td>
            <button  className="btn btn-danger"
             onClick={() => { if (window.confirm('Are you sure you wish to delete this Student?')) this.delete() } }>Delete</button>

          </td>
        </tr>
    );
  }
}

export default TableRow;