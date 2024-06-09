import React from 'react';
import './Card.css';

const Card = ({ title, length }) => {
    return (
        <div className="card">
            <div className="card-header">
                <span className="card-title">{title}</span>
            </div>
            <div className="card-body">
                <span className="card-terms">{length} terms</span>
            </div>
            <div className="card-footer">
                <span className="card-label">Saske Uchiha</span>
                <img src="/saske.jpg" alt="icon" className="card-icon" />
                <span className="card-role">User</span>
            </div>
        </div>
    );
}

export default Card;
