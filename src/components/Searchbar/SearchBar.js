import React from 'react';
import Loading from '../Loading/Loading';
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

  componentDidMount() {
    const storedTerm = sessionStorage.getItem("searchTerm");
    this.input.value = storedTerm;
    this.setState({ term: storedTerm });
  }

  handleRedirect = (term) => {
    const storedTerm = sessionStorage.getItem("searchTerm");
    if (storedTerm) {
      return;
    }
    sessionStorage.setItem("searchTerm", term);
  }

  handleClick = (e) => {
    this.handleRedirect(this.input.value);
    this.search();    
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleRedirect(this.input.value);
      this.search();
    }
  }

  handleTermChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
  }

  render() {
    return (
      <div className="SearchBar">
        <input 
          type="search"
          onKeyPress={this.handleKeyPress} 
          onChange={this.handleTermChange} 
          placeholder="Enter A Song, Album, or Artist"
          ref={node => this.input = node} 
        />
        <a onClick={this.handleClick}>SEARCH</a>
        {this.props.isLoading ? <Loading /> : null}
      </div>
    );
  }
}

export default SearchBar;
