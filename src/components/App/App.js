import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from '../Header';
import Landing from '../Landing/Landing';
import Projects from '../Projects/Projects';
import * as actions from '../../actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <div className="container" style={{ marginTop: 25 }}>
              <Route exact path="/" component={Landing} />
              <Route exact path="/projects" component={Projects} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
