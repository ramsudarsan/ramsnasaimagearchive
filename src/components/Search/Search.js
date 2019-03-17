import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            q: '',
            center: '',
            location: '',
            year_start: '',
            year_end: '',
            page: '',
            hidden: 'hidden',
            buttonText: 'Refine Search'
        }
    }

    componentDidMount() {
        const { q, center, location, start, end, page } = queryString.parse(this.props.location.search);
        this.props.getImages(q, center, location, start, end, page);
    }

    updateSearch = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.history.push(`/search?q=${this.state.q}&center=${this.state.center}&location=${this.state.location}&start=${this.state.year_start}&end=${this.state.year_end}&page=`)
        const { q, center, location, year_start, year_end, page } = this.state;
        this.props.getImages(q, center, location, year_start, year_end, page);
    }

    showHide = (e) => {
        e.preventDefault();
        if (this.state.hidden === '') {
            this.setState({
                hidden: 'hidden',
                buttonText: 'Refine Search'
            })
        } else {
            this.setState({
                hidden: '',
                buttonText: 'Hide'
            })
        }
    }

    render() {
        return (
            <div className="searchContainer">
                <form onSubmit={this.submitForm}>
                    <div className="searchContainerInside">
                        <div className="showHideContainer">
                            <div className="searchDiv">
                                <input className="search" type="text" name="q" placeholder="Search Term" onChange={this.updateSearch}></input>
                                <label htmlFor="q">Search Term</label>
                            </div>
                            <button className="searchButton showHideButton" onClick={this.showHide}>{this.state.buttonText}</button>
                        </div>
                        <div className={"additionalsearchparams " + this.state.hidden}>
                            <div className="searchDiv">
                                <input className="search" name="center" type="text" placeholder="Center" onChange={this.updateSearch}></input>
                                <label htmlFor="center">Center</label>
                            </div>
                            <div className="searchDiv">
                                <input className="search" name="location" type="text" placeholder="Location" onChange={this.updateSearch}></input>
                                <label htmlFor="location">Location</label>
                            </div>
                            <div className="searchDiv">
                                <input className="search" name="year_start" type="text" placeholder="Start Year" onChange={this.updateSearch}></input>
                                <label htmlFor="year_start">Start Year</label>
                            </div>
                            <div className="searchDiv">
                                <input className="search" name="year_end" type="text" placeholder="End Year" onChange={this.updateSearch}></input>
                                <label htmlFor="year_end">End Year</label>
                            </div>
                        </div>
                        <input type="submit" className="searchButton submitButton" value="Search" />
                    </div>
                </form>
            </div>
        );
    }
}

export default Search;