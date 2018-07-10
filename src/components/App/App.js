import React from 'react';
import './App.css';

import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchResults: [
        { name: 'Bon', artist: 'Jovi', album: 'My Life', id: '1' },
        { name: 'Erros', artist: 'Rama', album: 'LOL', id: '2' },
        { name: 'Super', artist: 'Tranmp', album: 'Sandman', id: '3' }
      ],
      playlistName: 'Metallica',
      playlistTracks: [
        { name: 'Alejo', artist: 'Sanz', album: 'La Vida', id: '1.1' },
        { name: 'Eminem', artist: 'Marshall', album: 'My Name', id: '1.2' },
        { name: 'Jay', artist: 'Z', album: 'YEAH', id: '1.3' }
      ]
    };
  }

  addTrack = (track) => {
    let tracks = this.state.playlistTracks;
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrack = (track) => {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName = (name) => {
    this.setState({ playlistName: name });
  }

  savePlaylist = () => {
    
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.SearchResults}
              onAdd={this.addTrack}
            />
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;