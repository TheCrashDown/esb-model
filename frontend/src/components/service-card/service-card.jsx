import React from 'react';

import './service-card.css'



const ServiceCard = (cardInfo) => {

    const { title, address, x, y, fromWorkspace, conStart, conEnd } = cardInfo

    function dragStartHadler(e) {
        e.dataTransfer.setData('item', JSON.stringify(cardInfo))
        if (fromWorkspace) {
            e.dataTransfer.dropEffect = "move"
        } else {
            e.dataTransfer.dropEffect = "copy"
        }
    }

    function dragEndHadler(e) {
        e.preventDefault()
    }

    function onIconClick(e) {
        console.log("arrow clicked")
        conStart()
    }

    function onCardClick(e) {
        console.log("card clicked")
        conEnd()
    }

    let positionOnWorkspace = {}

    if (x !== undefined && y !== undefined) {
        positionOnWorkspace = { position: 'absolute', left: x - 35, top: y - 50 }
    }

    return (
        <div
            style={positionOnWorkspace}
            draggable={true}
            onDragStart={(e) => dragStartHadler(e)}
            onDragEnd={(e) => dragEndHadler(e)}
            onClick={onCardClick}
            className='card'>
            <div className='info'>
                <span className='text'>{title}</span>
                <span className='text'>{address}</span>
            </div>
            <div className='icon'>
                <h3
                    onClick={onIconClick}
                    className="bi bi-arrow-right-square-fill" > </h3>
            </div>
        </div>
    )
}

export default ServiceCard;