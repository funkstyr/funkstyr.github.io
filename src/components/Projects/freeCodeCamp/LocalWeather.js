import React, { Component } from 'react';
import axios from 'axios';

const api_url = 'https://fcc-weather-api.glitch.me/api/current?';

const weatherIcons = weather => {
  switch (weather) {
    case 'drizzle':
      return <i className="fas fa-shower fa-x5" />;
    case 'clouds':
      return <i className="fas fa-cloud fa-5x" />;
    case 'rain':
      return <i className="fas fa-tint fa-5x" />;
    case 'snow':
      return <i className="far fa-snowflake fa-5x" />;
    case 'clear':
      return <i className="fas fa-sun fa-5x" />;
    case 'thunderstorm':
      return <i className="fas fa-bolt fa-5x" />;
    default:
      return <i className="fas fa-sun fa-5x" />;
  }
};

class LocalWeather extends Component {
  state = {
    city: 'city',
    country: 'country',
    temp: 0,
    tempUnit: 'C',
    lat: '',
    long: '',
    weather: '',
    sunrise: 0,
    sunset: 0
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState(
          {
            lat: position.coords.latitude,
            long: position.coords.longitude
          },
          () => {
            this.getWeather();
          }
        );
      });
    }
  }

  convertToF() {
    var temp = (this.state.temp * 1.8 + 32).toFixed(2);

    this.setState({ tempUnit: 'F', temp });
  }

  convertToC() {
    var temp = ((this.state.temp - 32) / 1.8).toFixed(2);

    this.setState({ tempUnit: 'C', temp });
  }

  getTime(time) {
    if (time < 1) return;

    var date = new Date(0);

    date.setSeconds(time);

    return date
      .toLocaleDateString('en-US', {
        hour: 'numeric',
        minute: 'numeric'
      })
      .split(',')[1];
  }

  getWeather() {
    var url = `${api_url}lat=${this.state.lat}&lon=${this.state.long}`;

    axios.get(url).then(response => {
      console.log(response);

      this.setState({
        weather: response.data.weather[0].main,
        country: response.data.sys.country,
        city: response.data.name,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset,
        temp: response.data.main.temp
      });
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col s6 center-align">
          {' '}
          <h5>
            {this.state.city},{this.state.country}
          </h5>
          <h4>
            {this.state.temp}{' '}
            <span
              onClick={() => {
                this.state.tempUnit === 'C'
                  ? this.convertToF()
                  : this.convertToC();
              }}
              style={{ cursor: 'pointer' }}
            >
              °{this.state.tempUnit}
            </span>
          </h4>
        </div>
        <div className="col s6 center-align">
          {weatherIcons(this.state.weather)}
          <p>Sunrise: {this.getTime(this.state.sunrise)}</p>
          <p>Sunset: {this.getTime(this.state.sunset)}</p>
        </div>
      </div>
    );
  }
}

export default LocalWeather;
