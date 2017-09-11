# React-TODO-List
Every web-dev should have one or two of them on Github ~


# Install react, react-dom and babel
All dependencies will be installed by npm after we initialized the repo (just confirm all defaults):

```
npm init
```

Now we will install the react packages:

```
npm install --save react react-dom
```

Now we will install the babel packages as development dependencies (to transform our ES6 Javascript):

```
npm install --save-dev react babel-core babel-loader babel-preset-es2015 babel-preset-react
```

Further we will use the Webpack dev-server to create a hot-reloading development environment for our app:

```
npm install --save-dev webpack webpack-dev-server
```

To configure our Webpack, we create a *webpack.config.js* inside the root directory of our app. We configure it to take all JS files from the /src folder and bundle them into the /dist (that will be created by Webpack). The babel-loader will use the react and es2015 preset to convert our code to standardized Javascript!

By setting the publicPath to */app/* we don't have to add the */dist* folder to links - *./dist/app/bundle.js* can be referenced by <script src="/app/bundle.js"></script> inside our *index.html* file.

```js
var path = require('path');

module.exports = {

    entry: path.resolve(__dirname, 'src') + '/app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist') + '/app',
        filename: 'bundle.js',
        publicPath: '/app/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};
```

Add the following npm scripts to package.json to be able to start the webpack-server with *npm start*:

```
"start": "npm run build",
"build": "webpack -d && webpack-dev-server --content-base src/ --inline --hot --port 1234 --history-api-fallback"
```

*npm start* will now trigger *npm run build* - where build fires up our webpack-server on **--port 1234**. The server expects a *index.js* file in the root directory. **--content-base src/** points it to our /src instead. **--inline** and **--hot** enables hot reloading.


# Create our first React Component

Require react and react-dom to */src/app/index.js* :

```
const React = require('react');
const ReactDOM = require('react-dom');
```

and create the **TodoComponent** written in JSX - always wrap your HTML into a div container (there must only be one parent tag in each component!):

```js
var TodoComponent = React.createClass({
  render: function(){
    return(
      <div>
        <h1>Hello World</h1>
        <p>First React Component</p>
      </div>
    );
  } // render
});
```

Now we have to get our component rendered inside the HTML file:

```
ReactDOM.render(<TodoComponent />, document.getElementById('todo-wrapper'));
```

The id **todo-wrapper** can be referenced inside a div tag in */src/index.html* to render our h1 tag:

```
<div id="todo-wrapper"></div>
```


# Passing Data into Component using Props

For example, we now create a constant with some data strings and pass them into our TodoComponent in */src/app/index.js*:

```js
const myData = {name:'Stefan Stefanopolos', year:'1922', origin:'Athens, Greece'}

ReactDOM.render(<TodoComponent data={myData}/>, document.getElementById('todo-wrapper'));
```

And reference this message inside the component itself:

```js
var TodoComponent = React.createClass({
  render: function(){
    return(
      <div>
        <ul>
          <li><strong>Author:</strong> {this.props.data.name}</li>
          <li><strong>Year:</strong> {this.props.data.year}</li>
          <li><strong>Location:</strong> {this.props.data.origin}</li>
        </ul>
      </div>
    );
  } //render
});
```

The string will now show up on our page. -> Just a proof of concept /delete


# Working with Component State

So far our component only has a render function - we will now add a getInitialState function on top:

```js
var TodoComponent = React.createClass({
  getInitialState: function(){
    return {
      todos:['Reply Emails', 'Proof-read Printmanuals', 'Generate new Search-Index']
    }
  },
  render: function(){
    return(
      <div id="todo-list">
        <h1>TODO List</h1>
        <ul>
          <li>{this.state.todos[0]}</li>
          <li>{this.state.todos[1]}</li>
          <li>{this.state.todos[2]}</li>
        </ul>
      </div>
    );
  } // render
});
```

```js
ReactDOM.render(<TodoComponent />, document.getElementById('todo-wrapper'));
```


# Using setState to change State of a Component

Another proof of concept - will be deleted before the next step.

We want to add a another variable to the InitialState and update this variable after 5 seconds:

```js
var TodoComponent = React.createClass({
  getInitialState: function(){
    return {
      todos:['Reply Emails', 'Proof-read Printmanuals', 'Generate new Search-Index'],
      date: '2017-09-11' // InitialState date will be changed after 5s by setTimeout function below
    }
  }, //InitialState
  render: function(){
    var dater = setTimeout(function(){
        this.setState({
          date: '2017-09-12'
        });
    }.bind(this), 5000); // Remember to bind 'this' to function!
    return(
      <div id="todo-list">
        <h1>TODO List</h1>
        <h3>{this.state.date}</h3>
        <ul>
          <li>{this.state.todos[0]}</li>
          <li>{this.state.todos[1]}</li>
          <li>{this.state.todos[2]}</li>
        </ul>
      </div>
    );
  } // render
});
```


# Cycling through data

Usually we do not know how many items are inside the InstialState array - lets write a function that works for any array.length

```js
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
```
