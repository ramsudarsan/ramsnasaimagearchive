import React from 'react';
import './CardModal.css';

const CardModal = ({ show, image, title, description, center, date, exitModal }) => {
    if (!show) {
        return (null);
    }
    return (
        <div className="dimBackground">
            <div className="modalContainer">
                <button className="exitModal" onClick={exitModal}><strong>Back</strong></button>
                <div className="modalImageHalf">
                    <img className="modalImageResult" src={image} onClick={() => window.open(image, '_blank')}/>
                </div>
                <div className="modalDetailHalf">
                    <h2>{title}</h2>
                    <p><strong>Date:</strong> {date}</p>
                    <p><strong>Center:</strong> {center}</p>
                    <p><strong>Description:</strong></p>
                    <p className="alignLeft"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a className="orange">> </a> {description}</p>
                </div>
            </div>
        </div>
    );
}

export default CardModal;