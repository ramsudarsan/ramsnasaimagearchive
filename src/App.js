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
      signedIn: false,
      results: [],
      hasNext: false,
      hasPrev: false,
      currPage: 1,
      showModal: false,
      image: '',
      description: '',
      title: '',
      center: '',
      date: ''
    }
  }

  getImages = (q, center, location, year_start, year_end, page) => {
    let queryString = '?';
    const checkq = (q === '' || q === undefined);
    const checkcenter = (center === '' || center === undefined);
    const checklocation = (location === '' || location === undefined);
    const checkstart = (year_start === '' || year_start === undefined);
    const checkend = (year_end === '' || year_end === undefined);
    const checkpage = (page === '' || page === undefined);

    if (q === undefined && center === undefined && location === undefined && year_start === undefined && year_end === undefined && page === undefined) {
      queryString = '';
    }
    else if (checkq && checkcenter && checklocation && checkstart && checkend && checkpage) {
      queryString = '?media_type=image';
    } else {
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

    fetch(`https://images-api.nasa.gov/search${queryString}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.collection);
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
          hasPrev: hasPrev
        })
      })
      .catch(() => {
        this.setState({
          results: []
        })
      });
  }

  showCardModal = (image, title, description, center, date) => {
    console.log(image);
    fetch(image)
    .then(response => response.json())
    .then(data => {
      this.setState({
        image: data[0],
        showModal: true,
        title: title,
        description: description,
        center: center,
        date: date
      });
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <CardModal show={this.state.showModal} image={this.state.image} title={this.state.title} description={this.state.description} center={this.state.center} date={this.state.date}/>
          <Header signedIn={this.state.signedIn} />
          <Route path="/" exact strict component={Welcome} />
          <Route path="/search" exact render={(props) => (
            <div>
              <Search getImages={this.getImages} {...props} />
              <Results results={this.state.results} hasNext={this.state.hasNext} hasPrev={this.state.hasPrev} showInfo = {this.showCardModal} />
            </div>
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
