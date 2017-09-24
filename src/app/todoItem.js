import React, { Component } from 'react';

import styles from './css/todoItem.css';


// Create TodoItem component
class TodoItem extends Component {
  render () {
    return (
      <li>
        <div className="todo-item">
          <span className="item-name">{this.props.item}</span>
          <span className="item-remove" onClick={this.handleDelete}> x </span>
        </div>
      </li>
    );
  }

  // Custom functions
  handleDelete () {
        this.props.onDelete(this.props.item);
  }
}

module.exports = TodoItem;
