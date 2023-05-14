import React from 'react';

import './service-card.css'


const ServiceCard = ({ title, address }) => {

    return (
        <div className='card'>
            <span className='text'>{title}</span>
            <span className='text'>{address}</span>
        </div>
    )
}

export default ServiceCard;