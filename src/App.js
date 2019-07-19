import React from 'react';
import './App.css';
import FetchWeather from './components/FetchWeather';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <FetchWeather/>
      </div>
    );
  }
}



export default App;
