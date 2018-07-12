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
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      loading: null
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
    this.setState({ loading: true });
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: [],
        loading: false
      });
    });
  }

  search = (term) => {
    let playlistTracksIDs = [];
    if (this.state.playlistTracks.length) {
      playlistTracksIDs = this.state.playlistTracks.map(track => track.id);      
    }       

    Spotify.search(term).then(searchResults => {
      if (playlistTracksIDs.length) {
        const filteredResults = searchResults.filter(result => {
          return playlistTracksIDs.indexOf(result.id) === -1;
        });
        this.setState({ searchResults: filteredResults });
      } else {
        this.setState({ searchResults: searchResults });
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar 
            onSearch={this.search}
            isLoading={this.state.loading} 
            searchResults={this.state.searchResults}
          />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults}
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
