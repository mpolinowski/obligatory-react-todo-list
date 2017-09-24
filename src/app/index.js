import React, { Component } from 'react';
import { render } from 'react-dom';

import{BrowserRouter as Router, Route, NavLink} from 'react-router-dom';

import styles from './css/index.css';

// Imported Modules
import TodoItem from './todoItem';
import AddItem from './addItem';
import About from './about';

const AppLayout = () => (
  <div className="layout">
    <header>
      <h1>Our Todo List</h1>
      <nav>
        <NavLink exact to="/" activeStyle={{fontWeight: 'bold', color: 'black'}}>Home </NavLink>
        <NavLink to="/about" activeStyle={{fontWeight: 'bold', color: 'black'}}> About</NavLink>
      </nav>
    </header>
    <main>
      <switch>
        <Route path='/' exact component={TodoComponent} />
        <Route path='/about' component={About} />
      </switch>
    </main>
  </div>
)

const App = () => (
  <Router>
    <AppLayout />
  </Router>
)

// Create component
class TodoComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      todos:['Reply Emails', 'Proof-read Printmanuals', 'Generate new Search-Index', 'drink a cup of coffee'],
      date: '2017-09-11'
    };
  } //InitialState
  render () {
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
        <AddItem onAdd={this.onAdd} />
      </div>
    );
  } // render

  // Custom functions
  onDelete (item) {
    var updatedTodos = this.state.todos.filter(function(value, index){
      return item !== value;
    });
    this.setState({
      todos: updatedTodos
    });
  }
  onAdd (item) {
      var updatedTodos = this.state.todos;
      updatedTodos.push(item);
      this.setState({
        todos: updatedTodos
      });
    }

    // lifecycle functions
      componentWillMount () {
        console.log('componentWillMount');
      } // function called directly before component is loaded
      componentDidMount () {
        console.log('componentDidMount');
      }  // function called directly after component is loaded => e.g. grab external DATA
      componentWillUpdate () {
        console.log('componentWillUpdate');
      }

  }


// Put component into HTML page
render(<App />, document.getElementById('todo-wrapper'));
