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
      ]
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.SearchResults} />
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;