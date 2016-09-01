import React, {Component} from 'react';

class Info extends Component {
  state = {

  }
  render() {
    let {track} = this.props;
    let title = null;
    let artist = null;
    if (track) {
      title = track.title;
      artist = track.user.username;
    }
    return (
      <div style={{fontSize: '10px', display: 'inline-block'}}>
        {artist}
        <br/>
        <b>{title}</b>
      </div>
    )
  }
}

export default Info;
