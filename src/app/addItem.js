import React, { Component } from 'react';

import styles from './css/addItem.css';


// Create AddItem component
class AddItem extends Component {
  render () {
    return(
      <form id="add-todo" onSubmit={this.handleSubmit}>
        <input type="text" required ref="newItem" />
        <input type="submit" value="Hit me" />
      </form>
    );
  }

  // Custom functions
  handleSubmit(e) {
    e.preventDefault();
    this.props.onAdd(this.refs.newItem.value);
  }

}

module.exports = AddItem;
