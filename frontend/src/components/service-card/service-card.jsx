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

    function onIconClick(e) {
        console.log(123)
    }

    let style = {}

    if (x !== undefined && y !== undefined) {
        style = {position:'absolute', left:x -35, top:y - 50}
    }
    
    return (
        <div
            style={style}
            draggable={true}
            onDragStart={(e) => dragStartHadler(e)} 
            onDragEnd={(e) => dragEndHadler(e)} 
            className='card'>
            <div className='info'>
                <span className='text'>{title}</span>
                <span className='text'>{address}</span>
            </div>
            <div className='icon'>
                <i 
                    onClick={(e) => onIconClick(e)}
                    className="bi bi-arrow-right-square-fill" />
            </div>
        </div>
    )
}

export default ServiceCard;