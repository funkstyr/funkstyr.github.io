import React, { Component } from 'react';
import axios from 'axios';

const qoute_url =
  'https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en';

class RandomQuotes extends Component {
  state = {
    quote: '',
    author: ''
  };

  componentDidMount() {
    this.getQuote();
  }

  getQuote() {
    axios.get(qoute_url).then(response => {
      this.setState({
        quote: response.data.quoteText,
        author: response.data.quoteAuthor
      });
    });
  }

  render() {
    var text = encodeURI(`"${this.state.quote}" - ${this.state.author}`);

    return (
      <div>
        <div className="center-align">
          <p className="flow-text">{this.state.quote}</p>
          <p className="">
            {this.state.author ? `- ${this.state.author}` : null}
          </p>
        </div>

        <div style={{ marginTop: 12 }}>
          <button
            className="btn right"
            onClick={() => {
              this.getQuote();
            }}
          >
            New Quote
          </button>

          <a
            className="btn blue"
            href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${
              text
            }`}
            target="_blank"
          >
            <i className="fab fa-twitter-square fa-lg" />
          </a>
        </div>
      </div>
    );
  }
}

export default RandomQuotes;
