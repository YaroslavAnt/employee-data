import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContactList from './ContactList';
import './Root.css';
import ModalWindow from './ModalWindow';

class Root extends Component {
  render() {
    console.log(this.props);

    return (
      <div className="App">
        <ContactList />
        <ModalWindow />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state,
});

export default connect(mapStateToProps)(Root);
