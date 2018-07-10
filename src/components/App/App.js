import React from 'react';
import './App.css';

import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchResults: [],
      playlistName: 'New Playlist',
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
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
  }

  search = (term) => {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults });
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar 
            onSearch={this.search} 
          />
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
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;