import React, { Component } from 'react';
import './ResultCard.css';

class ResultCard extends Component {
    constructor() {
        super()
        this.state = {
            image: '',
            title: '',
            descriptionChars: 125
        }
    }

    componentDidMount() {
        if (this.props.title.length > 37) {
            this.setState({
                title: this.props.title.substring(0, 37) + '...'
            });
        } else {
            this.setState({
                title: this.props.title
            });
        }
        if (this.props.title.length > 35) {
            this.setState({
                descriptionChars: 10
            });
        } 
        else if (this.props.title.length > 26) {
            this.setState({
                descriptionChars: 25
            });
        }
        else if (this.props.title.length > 13) {
            this.setState({
                descriptionChars: 75
            });
        }
        fetch(this.props.image)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    image: data[data.length-2]
                })
            });
    }

    render() {
        if (this.state.image === undefined) {
            return (null);
        }
        if (this.props.image.includes("nasa.gov/video")){
            return (null);
        }
        return (
            <div className="resultCard" onClick={() => this.props.showInfo(this.props.image, this.props.title, this.props.description, this.props.center, this.props.date.substring(0,10))} >
                <div className="imageHalf">
                    <img className="imageResult" src={this.state.image} />
                </div>
                <div className="detailHalf">
                    <h2>{this.state.title}</h2>
                    <p>Description: {this.props.description.substring(0, this.state.descriptionChars) + '...'}</p>
                    <p>Center: {this.props.center}</p>
                    <p>Date: {this.props.date.substring(0, 10)}</p>
                </div>
            </div>
        );
    }
}

export default ResultCard;
