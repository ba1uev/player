import React, { Component } from 'react';
import Player from './components/Player';

export default class App extends Component {
  state = {
    url: 'https://soundcloud.com/lightintheatticrecords/donnie-joe-emerson-baby',
    playing: false
  }
  style = {
    container: {
      width: '400px',
      height: '50px',
      backgroundColor: 'yellow',
      fontFamily: 'Courier'
    },
    playButton: {
      width: '50px',
      height: '50px',
      display: 'inline-block',
      backgroundColor: 'hotpink',
      textAlign: 'center',
      lineHeight: '50px',
      fontSize: '14px',
      cursor: 'pointer',
      color: '#fff'
    },
    timer: {
      width: '350px',
      display: 'inline-block',
      paddingLeft: '20px',
      boxSizing: 'border-box'
    },
  }
  done(soundCloudAudio) {
    this.soundCloudAudio = soundCloudAudio;
  }
  onStopTrack(soundCloudAudio) {
    console.log('end')
    // console.log()
    this.setState({ url: 'https://soundcloud.com/devolverdigital/jasper-byrne-miami' });
    // soundCloudAudio.play();
  }
  onSeekedTrack(soundCloudAudio) {
    console.log('seeked');
  }
  onResponceAudio(soundCloudAudio) {
    let {playing} = this.state;
    console.log('responce done!');
    playing && soundCloudAudio.play();
  }
  onStartTrack() {
    console.log('start playing');
    this.setState({ playing: true });
  }
  onPauseTrack() {
    console.log('paused');
  }
  render() {
    return (
      <div>
        <Player
          clientId='a3b90f1c9532ce48f0de95aee25adc91'
          resolveUrl={this.state.url}
          onStopTrack={::this.onStopTrack}
          onSeekedTrack={::this.onSeekedTrack}
          onResponceAudio={::this.onResponceAudio}
          onStartTrack={::this.onStartTrack}
          onPauseTrack={::this.onPauseTrack}
          done={::this.done}
          style={this.style}
        />
      </div>
    );
  }
}
