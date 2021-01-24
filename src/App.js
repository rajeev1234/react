import React, { Component } from 'react';
import Countries from 'countries-api';
import './App.css';
import Pagination from './components/Pagination';
import Card from './components/Card';
import axios from "axios";
class App extends Component {
  state = { allCountries: [], currentCountries: [], currentPage: null, totalPages: null,sortRating:"rating" }

  componentDidMount() {
    // const { data: allCountries = [] } = Countries.findAll();
    axios
        .get("https://barclaytest123.herokuapp.com/api/todos/")
        .then(res => this.setState({ currentCountries: res.data.results,totalCountries: res.data.count,totalPages: parseInt((res.data.count) / 100 + 1) }))
        .catch(err => console.log(err));
    // this.setState({ allCountries });

  }
  search(e,label){
    if(label == "search"){
      console.log('search')
      var searchValue = e.target.value
      var sort = ""
    }
    else{
      console.log('sort')
      var sort=this.state.sortRating
      var searchValue = ""
      this.setState({
        sortRating: (sort == "rating") ? "-rating" : (sort == "-rating") ? "rating" : "rating"
      })
      
    }
    console.log('search',e.target.value)
    axios
        .get(`https://barclaytest123.herokuapp.com/api/todos/?search=${searchValue}&ordering=${sort}`)
        .then(res => this.setState({ currentCountries: res.data.results,totalCountries: res.data.count,totalPages: parseInt((res.data.count) / 100 + 1) }))
        .catch(err => console.log(err));
  }
  onPageChanged = data => {
    const { allCountries } = this.state;
    const { currentPage, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentCountries = this.state.currentCountries
    const totalPages = this.state.totalPages
    this.setState({ currentPage,currentCountries, totalPages});
    axios
        .get(`https://barclaytest123.herokuapp.com/api/todos/?page=${currentPage}`)
        .then(res => this.setState({ currentCountries: res.data.results,totalCountries: res.data.count,totalPages: parseInt((res.data.count) / 100 + 1) }))
        .catch(err => console.log(err));
  }
  render() {
    const { allCountries, currentCountries, currentPage, totalPages,totalCountries } = this.state;
    console.log('allCountries',allCountries)
    console.log('currentCountries',currentCountries)
    console.log('currentPage',currentPage)
    console.log('totalCountries',totalCountries)
    // const totalCountries = this.state.totalCountries

    if (totalCountries === 0 || totalCountries === undefined) return null;

    const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();

    return (
      <div className="container mb-5">
        <div className="row d-flex flex-row py-5">
          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <h2 className={headerClass}>
                <strong className="text-secondary">{totalCountries}</strong> Books
              </h2>
              { currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                </span>
              ) }
            </div>
            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination totalRecords={totalCountries} pageLimit={100} pageNeighbours={1} onPageChanged={this.onPageChanged} />
            </div>
            <input onChange={(e) => this.search(e,'search')} className="form-control form-control-lg" type="text" placeholder="Search..."></input>
            <hr style={{backgroundColor:"white", width:"100%"}}></hr>
            <button type="button" onClick={(e) => this.search(e,'sort')} className="btn btn-warning">Sort by rating</button>
          </div>
          { currentCountries.map(country => <Card key={country.id} book={country} />) }
        </div>
      </div>
    );
  }
}


export default App;