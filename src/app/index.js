const React = require('react');
const ReactDOM = require('react-dom');

// Create component
var TodoComponent = React.createClass({
  getInitialState: function(){
    return {
      todos:['Reply Emails', 'Proof-read Printmanuals', 'Generate new Search-Index', 'drink a cup of coffee'],
      date: '2017-09-11'
    }
  }, //InitialState
  render: function(){
    var todos = this.state.todos; // create a local copy of todos array inside function
    todos = todos.map(function(item, index){ // put each item from todos array into JSX li-tags
      return(
        <li>{item}</li>
      )
    });
    return(
      <div id="todo-list">
        <h1>TODO List</h1>
        <h3>{this.state.date}</h3>
        <ul>
          {todos}
        </ul>
      </div>
    ); // we now reference the local todos variable instead of the this.state.todos
  } // render
});

// Put component into HTML page
ReactDOM.render(<TodoComponent />, document.getElementById('todo-wrapper'));
