import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  Form, FormGroup, Col, FormControl, Button, 
} from '../../node_modules/react-bootstrap';
import 'react-day-picker/lib/style.css';
import { addContact } from '../redux/configureReducer'; 

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dateOfBirth: '',
      vacation: '',
      salary: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getValidationName() {
    const { name } = this.state;
    if (/[^a-z]/gi.test(name) || name.length === 0) return 'error';
    return 'success';
  }

  getValidationDate() {
    const { dateOfBirth } = this.state;
    if (!dateOfBirth) return 'error';
    return 'success';
  }

  getValidationVacation() {
    const { vacation } = this.state;
    if (/[^a-z]/gi.test(vacation) || vacation.length === 0) return 'error';
    return 'success';
  }

  getValidationSalary() {
    const { salary } = this.state;
    if (/[^0-9]/gi.test(salary) || salary.length === 0) return 'error';
    return 'success';
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });    
  }
 
  handleClick(event) {    
    const { dispatch } = this.props;
    event.preventDefault();
    dispatch(addContact(this.state));
    this.setState({
      name: '',
      dateOfBirth: '',
      vacation: '',
      salary: '',
    });
  }

  render() {
    const { 
      name, dateOfBirth, vacation, salary, 
    } = this.state;
    return (
      <Form horizontal>
        <FormGroup validationState={this.getValidationName()}>
          <Col sm={2}>Name</Col>
          <Col sm={10}>
            <FormControl type="text" placeholder="Name" onChange={this.handleChange} name="name" value={name} />
          </Col>
        </FormGroup>

        <FormGroup validationState={this.getValidationDate()}>
          <Col sm={2}>Date Of Birth</Col>
          <Col sm={10}>
            <input type="date" onChange={this.handleChange} name="dateOfBirth" value={dateOfBirth} />
            
          </Col>
        </FormGroup>

        <FormGroup validationState={this.getValidationVacation()}>
          <Col sm={2}>Vacation</Col>
          <Col sm={10}>
            <FormControl type="text" placeholder="Vacation" onChange={this.handleChange} name="vacation" value={vacation} />
          </Col>
        </FormGroup>

        <FormGroup validationState={this.getValidationSalary()}>
          <Col sm={2}>Salary</Col>
          <Col sm={10}>
            <FormControl type="text" placeholder="Salary" onChange={this.handleChange} name="salary" value={salary} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" onClick={this.handleClick} disabled={this.getValidationName() === 'error' || this.getValidationVacation() === 'error' || this.getValidationDate() === 'error' || this.getValidationSalary() === 'error'}>Add Employee</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

InputForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(InputForm);
