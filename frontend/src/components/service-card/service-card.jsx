import React, {useState} from 'react';

import './service-card.css'



const ServiceCard = (cardInfo) => {

    const { title, address, x, y, fromWorkspace } = cardInfo

    function dragStartHadler(e) {
        console.log(9)
        e.dataTransfer.setData('item', JSON.stringify(cardInfo))
        if (fromWorkspace) {
            e.dataTransfer.dropEffect="move"
        } else {
            e.dataTransfer.dropEffect="copy"
        }
    }
    
    function dragEndHadler(e) {
        e.preventDefault()
    }

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