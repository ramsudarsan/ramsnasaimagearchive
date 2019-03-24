import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Welcome from './components/Welcome/Welcome';
import Search from './components/Search/Search';
import Results from './components/Results/Results';
import CardModal from './components/CardModal/CardModal';


class App extends Component {
  constructor() {
    super();
    this.state = {
      results: 'none',          /////
      hasNext: false,              /////// Results becomes an array containing the returned items from the fetch API call, and currPage keeps track of which page of the results I'm on.
      hasPrev: false,              //
      currPage: 1,              /////

      showModal: false,          /////
      modalImage: '',               //
      modalDescription: '',         /////// All of these are for information relevant to the modal/expanded view that is displayed when a card is clicked.
      modalTitle: '',               //
      modalCenter: '',              //
      modalDate: '',             /////

      q: '',                      /////
      center: '',                    //
      location: '',                  /////// These items keep track of the entered search queries so that clicking on the next page and previous page buttons can use the same queries.
      year_start: '',                //
      year_end: ''                /////
    }
  }

  getPrevImages = () => {
    const newPage = this.state.currPage - 1;
    this.getImages(this.state.q, this.state.center, this.state.location, this.state.year_start, this.state.year_end, newPage);

  }

  getNextImages = () => {
    const newPage = this.state.currPage + 1;
    this.getImages(this.state.q, this.state.center, this.state.location, this.state.year_start, this.state.year_end, newPage);
  }

  getImages = (q, center, location, year_start, year_end, page) => {
    let queryString = '?';
    let results = [];

    //"check" variables below check to see if the query parameters passed to this method are either empty or undefined.
    const checkq = (q === '' || q === undefined);
    const checkcenter = (center === '' || center === undefined);
    const checklocation = (location === '' || location === undefined);
    const checkstart = (year_start === '' || year_start === undefined);
    const checkend = (year_end === '' || year_end === undefined);
    const checkpage = (page === '' || page === undefined);

    let getpage = 1;
    //if the passed page value is neither null nor undefined, then set the correct page.
    if (!checkpage) {
      getpage = page;
    }

    //if everything is undefined then that means that the user has just entered the search page. Therefore, set results to 'none' instead of an empty array so that no error is displayed by the Results component
    if (q === undefined && center === undefined && location === undefined && year_start === undefined && year_end === undefined) {
      queryString = '';
      results = 'none';
    }
    else if (checkq && checkcenter && checklocation && checkstart && checkend) {
      queryString = '?media_type=image';
      if (!checkpage) {
        queryString += `&page=${getpage}`;
      }
      results = [];
    } else {
      results = [];
      if (!checkq) {
        queryString = queryString + "q=" + q + "&";
      }
      if (!checkcenter) {
        queryString = queryString + "center=" + center + "&";
      }
      if (!checklocation) {
        queryString = queryString + "location=" + location + "&";
      }
      if (!checkstart) {
        queryString = queryString + "year_start=" + year_start + "&";
      }
      if (!checkend) {
        queryString = queryString + "year_end=" + year_end + "&";
      }
      if (!checkpage) {
        queryString = queryString + "page=" + page + "&";
      }
    }

    //completed building the appropriate query string above, and will be used below in the fetch URL.

    fetch(`https://images-api.nasa.gov/search${queryString}`)
      .then(response => response.json())
      .then(data => {
        //console.log(data.collection);
        let hasNext = false;
        let hasPrev = false;
        if (data.collection.links === undefined) {

        }
        else if (data.collection.links[1] !== undefined) {
          hasNext = true;
          hasPrev = true;
        } else {
          if (data.collection.links[0].rel === "next") {
            hasNext = true;
          } else if (data.collection.links[0].rel === "prev") {
            hasPrev = true;
          }
        }
        this.setState({
          results: data.collection.items,
          hasNext: hasNext,
          hasPrev: hasPrev,
          q: q,
          center: center,
          location: location,
          year_start: year_start,
          year_end: year_end,
          currPage: getpage
        })
      })
      .catch(() => {
        this.setState({
          results: results,
          q: q,
          center: center,
          location: location,
          year_start: year_start,
          year_end: year_end,
          currPage: getpage
        });
      });
  }

  showCardModal = (image, title, description, center, date) => {
    console.log(image);
    fetch(image)
      .then(response => response.json())
      .then(data => {
        if (data[0].includes('.jpg') || data[0].includes('jpeg')) {
          this.setState({
            modalImage: data[0],
            showModal: true,
            modalTitle: title,
            modalDescription: description,
            modalCenter: center,
            modalDate: date
          });
        } else {
          this.setState({
            modalImage: data[1],
            showModal: true,
            modalTitle: title,
            modalDescription: description,
            modalCenter: center,
            modalDate: date
          });
        }
      })
  }

  exitModal = () => {
    //console.log('exit');
    this.setState({
      showModal: false
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <CardModal show={this.state.showModal} image={this.state.modalImage} title={this.state.modalTitle} description={this.state.modalDescription} center={this.state.modalCenter} date={this.state.modalDate} exitModal={this.exitModal} />
          <Header />
          <Route path="/" exact strict component={Welcome} />
          <Route path="/search" exact render={(props) => (
            <div>
              <Search getImages={this.getImages} {...props} />
              <Results getPrev={this.getPrevImages} getNext={this.getNextImages} results={this.state.results} hasNext={this.state.hasNext} hasPrev={this.state.hasPrev} showInfo={this.showCardModal} />
            </div>
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
