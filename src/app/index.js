import React from 'react';
import ReactDOM from 'react-dom';

import TodoItem from './todoItem';

import styles from './css/index.css';

// Create component
var TodoComponent = React.createClass({
  getInitialState: function(){
    return {
      todos:['Reply Emails', 'Proof-read Printmanuals', 'Generate new Search-Index', 'drink a cup of coffee'],
      date: '2017-09-11'
    }
  }, //InitialState
  render: function(){
    var todos = this.state.todos;
    todos = todos.map(function(item, index){
      return(<TodoItem key={index} item={item} onDelete={this.onDelete} />)
    }.bind(this));
    return(
      <div id="todo-list">
        <h1>TODO List</h1>
        <h3>{this.state.date}</h3>
        <ul>
          {todos}
        </ul>
      </div>
    );
  }, // render

  // Custom functions
  onDelete: function(item){
    var updatedTodos = this.state.todos.filter(function(value, index){
      return item !== value;
    });
    this.setState({
      todos: updatedTodos
    });
  }
});



// Put component into HTML page
ReactDOM.render(<TodoComponent />, document.getElementById('todo-wrapper'));
