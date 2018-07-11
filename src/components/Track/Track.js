import React from 'react';
import './Track.css';

class Track extends React.Component {
  renderAction = () => {
    return this.props.isRemoval ? 
      <a className="Track-action" onClick={this.removeTrack}> - </a> 
      : 
      <a className="Track-action" onClick={this.addTrack}> + </a>; 
  }

  addTrack = (e) => {
    this.props.onAdd(this.props.track);
  }

  removeTrack = (e) => {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>

          <audio controls>
            <source src={this.props.track.preview} type="audio/mpeg" />
          </audio>

        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
