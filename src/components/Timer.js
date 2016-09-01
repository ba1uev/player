import React, {Component} from 'react';

class Timer extends Component {
  static calcTime(time) {
    let hours = Math.floor(time / 3600);
    let mins = '0' + Math.floor((time % 3600) / 60);
    let secs = '0' + Math.floor((time % 60));
    mins = mins.substr(mins.length - 2);
    secs = secs.substr(secs.length - 2);
    if (!isNaN(secs)) {
      if (hours) {
        return `${hours}:${mins}:${secs}`;
      }
      return `${mins}:${secs}`;
    }
    return '00:00';
  }

  render() {
    const { currentTime, soundCloudAudio, style } = this.props;
    let { duration } = this.props;
    if (!duration && soundCloudAudio && soundCloudAudio.duration) {
      duration = soundCloudAudio.duration;
    }
    return (
      <div style={style.timer}>
        {Timer.calcTime(currentTime)} / {Timer.calcTime(duration)}
      </div>
    );
  }
}

export default Timer;
