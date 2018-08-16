import React, { Component } from 'react';
import { ButtonToolbar, Button, Modal } from '../../node_modules/react-bootstrap';
import InputForm from './InputForm';

class ModalWindow extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.state = {
      show: false,
    };
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleHide() {
    this.setState({ show: false });
  }

  render() {
    const { show } = this.state;
    return (
      <ButtonToolbar>
        <Button bsStyle="primary" onClick={this.handleShow}>
          Add new employee
        </Button>

        <Modal {...this.props} show={show} onHide={this.handleHide} dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Input employee data</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <InputForm />
          </Modal.Body>
        </Modal>
      </ButtonToolbar>
    );
  }
}

export default ModalWindow;
