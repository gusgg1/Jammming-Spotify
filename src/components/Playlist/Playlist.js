import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component {
  handleNameChange = (e) => {
    this.props.onNameChange(e.target.value);
  }

  handleClick = (e) => {
    if (this.props.playlistTracks.length === 0) return;
    this.props.onSave();
    e.target.parentNode.firstElementChild.value = 'New Playlist';
  }

  render() {
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue={"New Playlist"}/>
          <TrackList 
            tracks={this.props.playlistTracks} 
            onRemove={this.props.onRemove}
            isRemoval={true}
          />
        <a onClick={this.handleClick} className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
