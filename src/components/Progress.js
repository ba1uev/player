import React, {Component} from 'react';

class Progress extends Component {
  handleSeekTrack(e) {
    const { onSeekTrack, soundCloudAudio } = this.props;
    const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;
    if (soundCloudAudio && !isNaN(soundCloudAudio.audio.duration)) {
      soundCloudAudio.audio.currentTime = (xPos * soundCloudAudio.audio.duration);
    }
    onSeekTrack && onSeekTrack.call(this, xPos, e);
  }

  render() {
    const { currentTime, duration } = this.props;
    let { value } = this.props;

    if (!value && currentTime && duration) {
      value = (currentTime / duration) * 100 || 0;
    }
    if (value < 0) {
      value = 0;
    }
    if (value > 100) {
      value = 100;
    }

    let style = {
      height: '10px',
      backgroundColor: '#eee'
    }
    let innerStyle = {
      height: '100%',
      backgroundColor: '#bdbdbd',
      width: `${value}%`
    }

    return (
      <div style={style} onClick={::this.handleSeekTrack}>
        <div style={innerStyle} />
      </div>
    );
}
}

export default Progress;
