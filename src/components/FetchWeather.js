import React from "react";
import axios from "axios";
import FormField from "../components/FormField";
class FetchWeather extends React.Component {
  constructor(props) {
    super(props);
    this.fetchFormData = this.fetchFormData.bind(this);
    this.state = {
      weather: [],
      weatherForecast: []
    };
  }

  async fetchFormData(event) {
    const zip = document.querySelector("#zip").value;
    event.preventDefault();

    const getLoction = zip =>
      axios(
        `https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${zip}&facet=state&facet=timezone&facet=dst`
      )
        .then(res => res.data.records[0].fields)
        .catch(err => console.log(err));

    const getWeather = ({ latitude, longitude }) => {
      axios(
        `https://weather-endpoint.herokuapp.com/?location=${latitude},${longitude}`
      )
        .then()
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
        <FormField onSubmit={this.fetchFormData} />
        <div className="weatherGrid">
          {this.state.weatherForecast.map((daily, index) => (
            <div key={index}>
              <div className="grid">
                <div>
                  <h1>{daily.apparentTemperatureHigh}</h1>
                  <h4>High</h4>
                </div>
                <div>
                  <h1>{daily.temperatureLow}</h1>
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
