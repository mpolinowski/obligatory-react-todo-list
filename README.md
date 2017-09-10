# react-todo-list
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

and create the **TodoComponent** written in JSX:

```js
var TodoComponent = React.createClass({
  render: function(){
    return(
      <h1>Hello World</h1>
    );
  }
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
