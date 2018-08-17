import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Pagination } from '../../node_modules/react-bootstrap';

class PaginationComponent extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { onChangePage } = this.props;
    onChangePage(+event.target.name);
  }

  render() {
    console.log(this.props);
    const { currentPage, countOfItems, contacts } = this.props;
    const countOfPages = Math.ceil(contacts.length / countOfItems);
    const items = [];
    for (let number = 1; number <= countOfPages; number++) {
      items.push(
        <Pagination.Item active={number === currentPage} onClick={this.handleClick} name={number}>
          {number}
        </Pagination.Item>,
      );
    }
    return <Pagination bsSize="large">{items}</Pagination>;
  }
}

PaginationComponent.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  countOfItems: PropTypes.number.isRequired,
  contacts: PropTypes.array.isRequired,
};

const MapStateToProps = state => ({
  contacts: state,
});

export default connect(MapStateToProps)(PaginationComponent);
