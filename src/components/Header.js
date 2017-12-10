import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const styles = {
  brand: {
    marginLeft: 15
  },
  links: {
    marginRight: 10
  },
  logos: {
    marginRight: 5,
    marginLeft: 5
  }
};

class Header extends Component {
  renderContent() {
    return [
      <li key="1-link">
        <Link to="/projects">Projects</Link>
      </li>,
      <li key="3-link" style={styles.logos}>
        <a
          className="white-text"
          href="https://www.linkedin.com/in/michaelafunk"
          target="_blank"
        >
          <i className="fab fa-linkedin fa-lg" />
        </a>
      </li>,
      <li key="4-link" style={styles.links}>
        <a
          className="white-text"
          href="https://github.com/funkstyr"
          target="_blank"
        >
          <i className="fab fa-github fa-lg" />
        </a>
      </li>
    ];
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            className="left brand-logo"
            style={styles.brand}
            to={this.props.auth ? '/' : '/'}
          >
            Michael Funk
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
