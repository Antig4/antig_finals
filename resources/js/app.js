// resources/js/app.js
import React from 'react';
import ReactDOM from 'react-dom';
import Example from './components/Example';
import '../sass/app.scss';

const App = () => {
  return (
    <div className="App">
      <Example />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
