import React, {Component} from 'react';
import SoundCloudAudio from 'soundcloud-audio';
import { stopAllOther, addToPlayedStore } from '../utils/audioStore.js';

import PlayButton from './PlayButton';
import Timer from './Timer';
import Progress from './Progress';

class Player extends Component {

  constructor(props) {
    super(props)
    this.soundCloudAudio = new SoundCloudAudio(props.clientId);
    this.state = {
      duration: 0,
      currentTime: 0,
      seeking: false,
      playing: false
    }
  }

  componentWillReceiveProps(props) {
    if (props.resolveUrl !== this.props.resolveUrl) {
      console.log('change track');
      this.soundCloudAudio.pause();
      this.requestAudio(props.resolveUrl);
      // setTimeout(() => {
      //   this.soundCloudAudio.play();
      // }, 1000)
    }
    // if (props.)
  }

  componentDidMount() {
    this.mounted = true;
    this.requestAudio();
    this.listenAudioEvents();
    this.props.done(this.soundCloudAudio);
  }

  componentWillUnmount() {
    this.mounted = false;
    this.soundCloudAudio.unbindAll();
  }


  requestAudio(url) {
    const { soundCloudAudio } = this;
    const { streamUrl, onResponceAudio } = this.props;
    let resolveUrl = url || this.props.resolveUrl;
    if (streamUrl) {
      soundCloudAudio.preload(streamUrl);
    } else if (resolveUrl) {
      soundCloudAudio.resolve(resolveUrl, (data) => {
        if (!this.mounted) {
          return;
        }
        this.setState({
          [data.tracks ? 'playlist' : 'track']: data
        }, onResponceAudio && onResponceAudio(this.soundCloudAudio));
        console.log('setstate new track');
      });
    }
  }

  listenAudioEvents() {
    const { soundCloudAudio } = this;
    // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
    soundCloudAudio.on('playing', ::this.onAudioStarted);
    soundCloudAudio.on('timeupdate', ::this.getCurrentTime);
    soundCloudAudio.on('loadedmetadata', ::this.getDuration);
    soundCloudAudio.on('seeking', ::this.onSeekingTrack);
    soundCloudAudio.on('seeked', ::this.onSeekedTrack);
    soundCloudAudio.on('pause', ::this.onAudioPaused);
    soundCloudAudio.on('ended', ::this.onAudioEnded);
  }

  onSeekingTrack() {
    this.setState({seeking: true});
  }

  onSeekedTrack() {
    this.setState({seeking: false});
  }

  onAudioStarted() {
    const { soundCloudAudio } = this;
    const { onStartTrack } = this.props;
    this.setState({playing: true});
    stopAllOther(soundCloudAudio.playing);
    addToPlayedStore(soundCloudAudio);
    onStartTrack && onStartTrack(soundCloudAudio, soundCloudAudio.playing);
  }

  onAudioPaused() {
    const { onPauseTrack } = this.props;
    this.setState({playing: false});
    onPauseTrack && onPauseTrack(this.soundCloudAudio);
  }

  onAudioEnded() {
    const { onStopTrack } = this.props;
    this.setState({playing: false});
    onStopTrack && onStopTrack(this.soundCloudAudio);

  }

  getCurrentTime() {
    this.setState({
      currentTime: this.soundCloudAudio.audio.currentTime
    });
  }

  getDuration() {
    this.setState({
      duration: this.soundCloudAudio.audio.duration
    });
  }

  render() {
    let {style} = this.props;
    return (
      <div style={style.container}>
        <PlayButton
          soundCloudAudio={this.soundCloudAudio}
          {...this.props}
          {...this.state}
        />

        <Timer
          soundCloudAudio={this.soundCloudAudio}
          {...this.props}
          {...this.state}
        />

        <Progress
          soundCloudAudio={this.soundCloudAudio}
          {...this.props}
          {...this.state}
        />
      </div>
    )
  }
}

export default Player;
