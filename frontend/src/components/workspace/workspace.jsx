import React, { useState } from 'react';

import './workspace.css'
import ServiceCard from '../service-card';



const Workspace = ({ conStart }) => {

    const [items, setItems] = useState([])
    const [nextId, setNextId] = useState(100)

    function incId() {
        const current = nextId;
        setNextId(current + 1);
        return current;
    }

    function dragOverHadler(e) {
        e.preventDefault()
    }

    function dragLeaveHadler(e) {

    }

    function dropHadler(e) {
        const item = JSON.parse(e.dataTransfer.getData("item"))
        if (!item.fromWorkspace) {
            item.id = incId()
            item.x = e.clientX
            item.y = e.clientY
            console.log(item)
            setItems([...items, item])
        } else {
            let idx_deleted = items.findIndex(i => i.id === item.id)
            const currItems = [...items.slice(0, idx_deleted),
                               ...items.slice(idx_deleted + 1)]
            item.id = incId()
            item.x = e.clientX
            item.y = e.clientY
            console.log(item)
            setItems([...currItems, item])
        }
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
                                                id={item.id}
                                                title={item.title} 
                                                address={item.address}
                                                x={item.x} 
                                                y={item.y}
                                                fromWorkspace={true}
                                                conStart={() => conStart(item.id)}
                                                />)}
            </div>

        </div>
    )
}

export default Workspace;