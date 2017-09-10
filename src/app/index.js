const React = require('react');
const ReactDOM = require('react-dom');

// Create component
var TodoComponent = React.createClass({
  render: function(){
    return(
      <div>
        <h1>Hello World</h1>
        <p>First React Component</p>
      </div>
    );
  }
});

// Put component into HTML page
ReactDOM.render(<TodoComponent />, document.getElementById('todo-wrapper'));
