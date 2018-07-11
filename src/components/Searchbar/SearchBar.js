import React from 'react';

import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
  }

  search = (e) => {
    this.props.onSearch(this.state.term);
  }

  handleClick = (e) => {
    this.search();    
    e.target.previousElementSibling.value = '';
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.search();
      e.target.value = '';
    }
  }

  handleTermChange = (e) => {
    this.setState({ term: e.target.value });
  }

  render() {
    return (
      <div className="SearchBar">
        <input onKeyPress={this.handleKeyPress} onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.handleClick}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;