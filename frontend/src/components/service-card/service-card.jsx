import React, {useState} from 'react';

import './service-card.css'



const ServiceCard = ({ title, address, x, y }) => {
    function dragStartHadler(e) {
        console.log(9)
        e.dataTransfer.setData('item', JSON.stringify({ title, address }))
        e.dataTransfer.dropEffect="copy"
    }
    
    function dragEndHadler(e) {
    
    }

    console.log({ title, address, x, y })
    if (x !== undefined && y !== undefined) {
        return (
            <div style={{position:'absolute', left:x -35, top:y - 50}}
                draggable={true}
                onDragStart={(e) => dragStartHadler(e)} 
                onDragEnd={(e) => dragEndHadler(e)} 
                className='card'>
                <span className='text'>{title}</span>
                <span className='text'>{address}</span>
            </div>
        )
    }
    
    return (
        <div
            draggable={true}
            onDragStart={(e) => dragStartHadler(e)} 
            onDragEnd={(e) => dragEndHadler(e)} 
            className='card'>
            <span className='text'>{title}</span>
            <span className='text'>{address}</span>
        </div>
    )
}

export default ServiceCard;