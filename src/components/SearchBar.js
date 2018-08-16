import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { onChangeInput } = this.props;
    this.setState({
      value: event.target.value,
    });
    onChangeInput(event.target.value);
  }

  render() {
    const { value } = this.state;
    return (
      <FormGroup>
        <ControlLabel>Enter name</ControlLabel>
        <FormControl
          type="text"
          placeholder="Search..."
          onChange={this.handleChange}
          value={value}
        />
        <FormControl.Feedback />
      </FormGroup>
    );
  }
}

SearchBar.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
};

export default SearchBar;
