import React from "react";
import axios from "axios";
import FormField from "../components/FormField";

class FetchWeather extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      weather: [],
      weatherForecast: [],
      city: '',
      locationState: '',
      userLocation: ''
    };
  }

  async handleSubmit(event) {
    event.preventDefault();
    const zip = document.querySelector("#zip").value;

    const getLoction = zip =>
      axios(
        `https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${zip}&facet=state&facet=timezone&facet=dst`
      )
        .then(response => {

          let { city, state : locationState } = response.data.records[0].fields;

          this.setState({
            userLocation: city + ', ' + locationState
          })

          return response.data.records[0].fields;
        })
        .catch(err => console.log(err));


    const getWeather = ({ latitude, longitude }) => {
      axios(
        `https://weather-endpoint.herokuapp.com/?location=${latitude},${longitude}`
      )
        .then(res => {
          this.setState({
            currentWeather: res.data.currently,
            weatherForecast: res.data.daily.data
          });
        })
        .catch(err => console.log(err));
    };

    let fetchLocation = await getLoction(zip);
    await getWeather(fetchLocation);
  }

  render() {
    return (
      <>
        <FormField 
          onSubmit={this.handleSubmit} 
        />
        <div>
          
          <h1> { this.state.userLocation } </h1>
        </div>
        <div className="weatherGrid">
          {this.state.weatherForecast.map((daily, index) => (
            <div key={index} className="grid">
              <div>
                <div>
                  <h1>{Math.round(daily.apparentTemperatureHigh)}</h1>
                  <h4>High</h4>
                </div>
                <div>
                  <h1>{Math.round(daily.temperatureLow)}</h1>
                  <h4>Low</h4>
                </div>
              </div>
              <div className="summary">{daily.summary}</div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default FetchWeather;
