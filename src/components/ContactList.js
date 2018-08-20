import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import './ContactList.css';
import SearchBar from './SearchBar';
import { deleteContact } from '../redux/configureReducer';
import ModalWindowCorrect from './ModalWindowCorrect';
import PaginationComponent from './PaginationComponent';

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: '',
      show: false,
      indexVal: null,
      currentPage: 1,
      countOfItems: 5,
    };
    this.displayContacts = this.displayContacts.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  displayContacts(input) {
    this.setState({
      searchVal: input,
      currentPage: 1,
    });
  }

  handleClickDelete(event) {
    const { dispatch } = this.props;
    dispatch(deleteContact(event.target.value));
  }

  handleShow(event) {
    this.setState({
      searchVal: '',
      show: true,
      indexVal: +event.target.value,
    });
  }

  handleHide() {
    this.setState({
      show: false,
    });
  }

  handleChangePage(currentPage) {    
    this.setState({
      currentPage,
    });
  }

  render() {    
    const { contacts } = this.props;
    const { 
      searchVal, show, indexVal, currentPage, countOfItems, 
    } = this.state;
    return (
      <div className="container">
        <SearchBar onChangeInput={this.displayContacts} />
        <Table bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date Of Birth</th>
              <th>Vacation</th>
              <th>Salary</th>
              <th>Controlls</th>
            </tr>
          </thead>
          <tbody>
            {contacts
              .filter(el => (searchVal ? el.name.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1 : el))
              .slice((currentPage - 1) * countOfItems, (currentPage - 1) * countOfItems + countOfItems)
              .map((contact, index) => (
                <tr key={JSON.stringify(contact)}>
                  <td>{(currentPage - 1) * countOfItems + index + 1}</td>
                  <td>{contact.name}</td>
                  <td>{contact.dateOfBirth}</td>
                  <td>{contact.vacation}</td>
                  <td>{contact.salary}</td>
                  <td className="controllsCell">
                    <Button bsStyle="success" onClick={this.handleShow} value={index}>
                      Correct
                    </Button>
                    <Button bsStyle="danger" onClick={this.handleClickDelete} value={contact.name}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <ModalWindowCorrect onHide={this.handleHide} visible={show} indexval={indexVal}  />
        <PaginationComponent 
          onChangePage={this.handleChangePage} 
          currentPage={currentPage} 
          countOfItems={countOfItems} 
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state,
});

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ContactList);
