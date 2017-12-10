import React from 'react';

const styles = {
  logo: {
    marginRight: 10,
    marginBottom: 15
  },
  title: {
    marginTop: 0,
    marginBottom: 15
  }
};

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text" style={styles.title}>
              Michael Funk
            </h5>
          </div>
          <div className="col l4 offset-l2 s12">
            <a className="white-text" href="#!">
              <i className="fab fa-linkedin fa-2x" style={styles.logo} />
            </a>

            <a className="white-text" href="#!">
              <i className="fab fa-github fa-2x" style={styles.logo} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
