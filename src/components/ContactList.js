import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import './ContactList.css';
import SearchBar from './SearchBar';
import { deleteContact } from '../redux/configureReducer';
import ModalWindowCorrect from './ModalWindowCorrect';

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: '',
      show: false,
      indexVal: null,
    };
    this.displayContacts = this.displayContacts.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  displayContacts(input) {
    this.setState({
      searchVal: input,
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

  render() {
    const { contacts } = this.props;
    const { searchVal, show, indexVal } = this.state;
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
              <th>Salery</th>
              <th>Controlls</th>
            </tr>
          </thead>
          <tbody>
            {contacts
              .filter(el => (searchVal ? el.name.indexOf(searchVal) !== -1 : el))
              .map((contact, index) => (
                <tr key={contact.name}>
                  <td>{index + 1}</td>
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
        <ModalWindowCorrect onHide={this.handleHide} visible={show} indexval={indexVal} />
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
