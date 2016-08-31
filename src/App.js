import React, { Component } from 'react';
import Player from './components/Player';

export default class App extends Component {
  state = {
    url: 'https://soundcloud.com/company-record-label/vinyl-williams-world-soul'
  }
  next() {
    console.log('next!');
    this.setState({ url: 'https://soundcloud.com/devolverdigital/jasper-byrne-miami' })
  }
  render() {
    return (
      <div>
        <Player
          clientId='a3b90f1c9532ce48f0de95aee25adc91'
          resolveUrl={this.state.url}
        />
        <button onClick={::this.next}>next :)</button>
      </div>
    );
  }
}
