import React, {Component} from 'react';
// import SoundCloudAudio from 'soundcloud-audio';

class PlayButton extends Component {
  shouldComponentUpdate(nextProps) {
    const { playing, seeking } = this.props;
    return (
      playing !== nextProps.playing || seeking !== nextProps.seeking
    );
  }

  handleClick(e) {
    const { playing, soundCloudAudio, onTogglePlay } = this.props;
    if (!playing) {
      soundCloudAudio && soundCloudAudio.play();
    } else {
      soundCloudAudio && soundCloudAudio.pause();
    }
    onTogglePlay && onTogglePlay(e);
  }

  render() {
    // console.log('props:', this.props)
    const { playing, seeking, style } = this.props;
    let iconNode;
    if (seeking) {
      iconNode = 'seeking';
    } else if (playing) {
      iconNode = 'pause';
    } else {
      iconNode = '▶';
    }
    return (
      <div style={style.playButton} onClick={::this.handleClick}>
        {iconNode}
      </div>
    )
  }
}

export default PlayButton;
