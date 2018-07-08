import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/searchComponet/search.js';

class App extends Component {
  render() {   
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">New York Times Article Scrubber</h1>
            <span> Search and annotate articles of intrest </span>
        </header>
       <Search />
      </div>
    );
  }
}

export default App;
