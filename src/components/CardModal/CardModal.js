import React from 'react';
import './CardModal.css';

const CardModal = ({ show, image, title, description, center, date }) => {
    if (!show) {
        return (null);
    }
    return (
        <div className="dimBackground">
            <div className="modalContainer">
                <div className="modalImageHalf">
                    <img className="modalImageResult" src={image} />
                </div>
                <div className="modalDetailHalf">
                    <h2>{title}</h2>
                    <p><strong>Date:</strong> {date}</p>
                    <p><strong>Center:</strong> {center}</p>
                    <p><strong>Description:</strong> {description}</p>
                </div>
            </div>
        </div>
    );
}

export default CardModal;