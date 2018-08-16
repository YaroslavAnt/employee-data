import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { Modal } from '../../node_modules/react-bootstrap';
import InputFormCorrect from './InputFormCorrect';

class ModalWindowCorrect extends Component {
  render() {
    const { onHide, visible, indexval } = this.props;
    return (
      <Modal {...this.props} show={visible} onHide={onHide} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Correct employee data</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <InputFormCorrect indexval={indexval} />
        </Modal.Body>
      </Modal>
    );
  }
}

ModalWindowCorrect.propTypes = {
  visible: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  indexval: PropTypes.number,
};

ModalWindowCorrect.defaultProps = {
  indexval: null,
};

export default ModalWindowCorrect;
