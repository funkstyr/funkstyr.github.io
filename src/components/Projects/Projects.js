import React, { Component } from 'react';

import RandomQuotes from './freeCodeCamp/RandomQuotes';
import LocalWeather from './freeCodeCamp/LocalWeather';

const projects = [
  { name: 'Quote Machine', component: <RandomQuotes />, link: '#!' },
  { name: 'Local Weather', component: <LocalWeather />, link: '#!' }
];

class Projects extends Component {
  renderProjects() {
    return projects.map(({ name, component, link }, index) => {
      return (
        <div className="col s12" key={`project_${index}`}>
          <div className="card hoverable">
            <div className="card-content black-text">{component}</div>
            <div className="card-action">
              <div className="row" style={{ marginBottom: 0 }}>
                <span style={{ fontSize: 18 }}>{name}</span>
                <a href={link} className="right">
                  <i className="fas fa-code fa-lg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>Projects</h1>
        <div className="row">{this.renderProjects()}</div>
      </div>
    );
  }
}

export default Projects;
