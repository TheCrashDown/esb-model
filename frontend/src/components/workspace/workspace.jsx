import React, { useState } from 'react';

import './workspace.css'
import ServiceCard from '../service-card';



const Workspace = () => {

    const [items, setItems] = useState([{id:1, title:"s4", address:"123"}])
    const [nextId, setNextId] = useState(100)

    function incId() {
        const current = nextId;
        setNextId(current + 1);
        return current;
    }

    function dragOverHadler(e) {
        e.preventDefault()
        console.log(1)
        e.dataTransfer.dropEffect = "copy";

    }
    function dragLeaveHadler(e) {
        console.log(2)
    
    }
    function dropHadler(e) {
        console.log(3)
        const item = JSON.parse(e.dataTransfer.getData("item"))
        item.id = incId()
        item.x = e.clientX
        item.y = e.clientY
        console.log(item)
        setItems([...items, item])
    }

    return (
        <div 
            onDragLeave={(e) => dragLeaveHadler(e)} 
            onDragOver={(e) => dragOverHadler(e)} 
            onDrop={(e) => dropHadler(e)} 
            className='space'>
            <h2 className='text'>Workspace</h2>

            <div>
                {items.map(item => <ServiceCard key={item.id} 
                                                title={item.title} 
                                                address={item.address}
                                                x={item.x} 
                                                y={item.y}/>)}
            </div>

        </div>
    )
}

export default Workspace;