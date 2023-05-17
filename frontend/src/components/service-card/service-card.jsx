import React from 'react';

import './service-card.css'



const ServiceCard = (cardInfo) => {

    const { title, address, x, y, fromWorkspace, conStart } = cardInfo

    function dragStartHadler(e) {
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
        console.log("arrow clicked")
        conStart()

    }

    let positionOnWorkspace = {}

    if (x !== undefined && y !== undefined) {
        positionOnWorkspace = {position:'absolute', left:x -35, top:y - 50}
    }
    
    return (
        <div
            style={positionOnWorkspace}
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
                    onClick={onIconClick}
                    className="bi bi-arrow-right-square-fill" />
            </div>
        </div>
    )
}

export default ServiceCard;