import React from 'react';
import ResultCard from '../ResultCard/ResultCard';
import './Results.css';

const Results = ({ results, showInfo, hasNext, hasPrev, getNext, getPrev }) => {
    if (results === 'none') {
        return (null);
    }
    if (results.length === 0) {
        return (
            <div>
                <p>No results found.</p>
            </div>
        );
    }
    if (hasPrev && hasNext) {
        return (
            <div>
                <div className="buttonsContainer">
                    <button className="directionButton" onClick={getPrev}>Previous Page</button>
                    <button className="directionButton" onClick={getNext}>Next Page</button>
                </div>
                <div className="resultsContainer">

                    {results.map((result, i) => {
                        return (
                            <ResultCard key={result.href} showInfo={showInfo} image={result.href} description={result.data[0].description} title={result.data[0].title} center={result.data[0].center} date={result.data[0].date_created} />
                        );
                    })}
                </div>
            </div>
        );
    }
    if (hasPrev) {
        return (
            <div>
                <div className="buttonsContainer">
                    <button className="directionButton" onClick={getPrev}>Previous Page</button>
                </div>
                <div className="resultsContainer">
                    {results.map((result, i) => {
                        return (
                            <ResultCard key={result.href} showInfo={showInfo} image={result.href} description={result.data[0].description} title={result.data[0].title} center={result.data[0].center} date={result.data[0].date_created} />
                        );
                    })}
                </div>
            </div>
        );
    }
    if (hasNext) {
        return (
            <div>
                <div className="buttonsContainer">
                    <button className="directionButton" onClick={getNext}>Next Page</button>
                </div>
                <div className="resultsContainer">
                    {results.map((result, i) => {
                        return (
                            <ResultCard key={result.href} showInfo={showInfo} image={result.href} description={result.data[0].description} title={result.data[0].title} center={result.data[0].center} date={result.data[0].date_created} />
                        );
                    })}
                </div>
            </div>
        );
    }
    return (
        <div className="resultsContainer">
            {results.map((result, i) => {
                return (
                    <ResultCard key={result.href} showInfo={showInfo} image={result.href} description={result.data[0].description} title={result.data[0].title} center={result.data[0].center} date={result.data[0].date_created} />
                );
            })}
        </div>
    );
}

export default Results;