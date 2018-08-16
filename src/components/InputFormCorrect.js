import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  Form, FormGroup, Col, FormControl, Button, 
} from '../../node_modules/react-bootstrap';
import 'react-day-picker/lib/style.css';
import { correctContact } from '../redux/configureReducer';
 

class InputFormCorrect extends Component {
  constructor(props) {
    super(props);
    const { indexval } = this.props;
    this.state = {
      contact: {
        name: 'a',
        dateOfBirth: '',
        vacation: 'a',
        salary: 5,
      },
      indexval,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getValidationName = this.getValidationName.bind(this);
    this.getValidationDate = this.getValidationDate.bind(this);
    this.getValidationVacation = this.getValidationVacation.bind(this);
    this.getValidationSalary = this.getValidationSalary.bind(this);
  }

  getValidationName() {
    const { contact: { name } } = this.state;
    if (/[^a-z]/gi.test(name) || name.length === 0) return 'error';
    return 'success';
  }

  getValidationDate() {
    const { contact: { dateOfBirth } } = this.state;
    if (!dateOfBirth) return 'error';
    return 'success';
  }

  getValidationVacation() {
    console.log(this.state);
    
    const { contact: { vacation } } = this.state;
    console.log(vacation);
    
    if (/[^a-z]/gi.test(vacation) || vacation.length === 0) return 'error';
    return 'success';
  }

  getValidationSalary() {
    const { contact: { salary } } = this.state;
    if (/[^0-9]/gi.test(salary) || salary.length === 0) return 'error';
    return 'success';
  }

  handleChange(event) {
    const { contact } = this.state;
    this.setState({  
      contact: { ...contact, [event.target.name]: event.target.value },
    });   
    console.log(this.state);    
  }
 
  handleClick(event) {    
    const { dispatch } = this.props;
    const { contact, indexval } = this.state;
    event.preventDefault();
    dispatch(correctContact(indexval, contact));
    this.setState({
      contact: {
        name: '',
        dateOfBirth: '',
        vacation: '',
        salary: '',
      },
      indexval: '',
    });
  }

  render() {
    const { 
      contact: {
        name, dateOfBirth, vacation, salary, 
      }, 
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
            <Button onClick={this.handleClick} disabled={this.getValidationName() === 'error' || this.getValidationVacation() === 'error' || this.getValidationDate() === 'error' || this.getValidationSalary() === 'error'}>Add Employee</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

InputFormCorrect.propTypes = {
  dispatch: PropTypes.func.isRequired,
  indexval: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default connect()(InputFormCorrect);
