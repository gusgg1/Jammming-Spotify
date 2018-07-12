import React from 'react';
import Loading from '../Loading/Loading';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      storedTerm: ''
    };
  }

  search = (e) => {
    this.props.onSearch(this.state.term);
  }

  handleRedirect = (term) => {
    if (!this.props.searchResults.length) {
      sessionStorage.setItem("searchTerm", term);
      const storedTerm = sessionStorage.getItem("searchTerm");
      if (this.state.storedTerm === '') this.setState({ storedTerm });
    }
  
    console.log(this.state.storedTerm);
    console.log(window.location.href);            
    console.log(this.props.searchResults)
    
    

    // if (window.location.href.includes('access_token')) {
    //   console.log(storedTerm);      
    // }
  }

  handleClick = (e) => {
    // this.handleRedirect(e.target.previousElementSibling.value);


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
    const term = e.target.value;
    if (!this.props.searchResults.length) {
      localStorage.setItem("searchTerm", term);
      // const storedTerm = sessionStorage.getItem("searchTerm");
      this.setState({ storedTerm: localStorage.getItem("searchTerm") });
      console.log(this.state.storedTerm);           
      // if (this.state.storedTerm === '') this.setState({ storedTerm });
    }


    this.setState({ term });
  }

  render() {
    return (
      <div className="SearchBar">
        <input onKeyPress={this.handleKeyPress} onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.handleClick}>SEARCH</a>
        {this.props.isLoading ? <Loading /> : null}
      </div>
    );
  }
}

export default SearchBar;



// const term = e.target.value;
// sessionStorage.setItem("searchTerm", term);
// const storedTerm = sessionStorage.getItem("searchTerm");
// console.log(storedTerm);