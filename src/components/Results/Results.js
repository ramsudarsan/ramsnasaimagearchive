import React from 'react';
import ResultCard from '../ResultCard/ResultCard';
import './Results.css';

const Results = ({ results, showInfo }) => {
    if (results === []){
        return (
            <div>
                <p>No results found.</p> 
            </div>
        );
    }
    return (
        <div className = "resultsContainer">
            {results.map((result, i) => {
                return (
                    <ResultCard key={result.href} showInfo={showInfo} image={result.href} description={result.data[0].description} title={result.data[0].title} center={result.data[0].center} date={result.data[0].date_created}/>
                );
            })}
        </div>
    );
}

export default Results;