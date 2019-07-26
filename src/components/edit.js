import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeStudent_Id = this.onChangeStudent_Id.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      student_Id: '',
      name: '',
      address:'',
      email:''
    }
  }

  componentDidMount() {
      axios.get('http://localhost:5001/student/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                student_Id: response.data.student_Id, 
                name: response.data.name,
                address: response.data.address ,
                email:response.data.email});
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
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      student_Id: this.state.student_Id,
      name: this.state.name,
      address: this.state.address,
      email: this.state.email
    };
    axios.post('http://localhost:5001/student/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/index');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Student</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Student ID:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.student_Id}
                      onChange={this.onChangeStudent_Id}
                      />
                </div>
                <div className="form-group">
                    <label>Student Name: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.name}
                      onChange={this.onChangeName}
                      />
                </div>
                <div className="form-group">
                    <label>Address: </label>
                    <textarea
                      className="form-control"
                      value={this.state.address}
                      onChange={this.onChangeAddress}
                      />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="email" 
                      className="form-control"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update Student" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}