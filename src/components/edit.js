import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeStudent_Id = this.onChangeStudent_Id.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      student_Id: '',
      name: '',
      address:''
    }
  }

  componentDidMount() {
      axios.get('http://localhost:5001/student/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                student_Id: response.data.student_Id, 
                name: response.data.name,
                address: response.data.address });
          })
          .catch(function (error) {
              console.log(error);
          })
    }

  onChangeStudent_Id(e) {
    this.setState({
      student_Id: e.target.value
    })
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    })  
  }
  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      student_Id: this.state.student_Id,
      name: this.state.name,
      address: this.state.address
    };
    axios.post('http://localhost:5001/student/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/index');
  }
 
  render() {
    const { student_Id, name, address } = this.state;
    const enabled =
          student_Id.length > 0 &&
          name.length > 0 && 
          address.length > 0;
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Student</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Student ID:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder= "Student ID"
                      value={this.state.student_Id}
                      required
                      onChange={this.onChangeStudent_Id}
                      />
                </div>
                <div className="form-group">
                    <label>Student Name: </label>
                    <input type="text" 
                      className="form-control"
                      placeholder= "name"
                      maxLength= "40"
                      value={this.state.name}
                      required
                      onChange={this.onChangeName}
                      />
                </div>
                <div className="form-group">
                    <label>Address: </label>
                    <textarea
                      className="form-control"
                      placeholder= "address"
                      maxLength= "40"
                      value={this.state.address}
                      required
                      onChange={this.onChangeAddress}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update Student" 
                      className="btn btn-primary"
                      disabled={!enabled}/>
                </div>
            </form>
        </div>
    )
  }
}