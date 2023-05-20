import React from 'react'

import ServiceCard from '../service-card'
import './service-list.css'

const ServiceList = ({ data, updateServices }) => {

    return (
        <div className='service-list'>

            <div className='header'>
                <h2>Service List</h2>
                <h3
                    className="bi bi-arrow-counterclockwise refreshicon"
                    onClick={updateServices}>
                        
                </h3>
            </div>
            <ul >{
                data.map((item) => {
                    const { id, title, address } = item
                    return <ServiceCard key={id}
                        id={id}
                        title={title}
                        address={address}
                        fromWorkspace={false} />
                })
            }</ul>
        </div>
    )
}

export default ServiceList