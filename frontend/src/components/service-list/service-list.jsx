import React from 'react'

import ServiceCard from '../service-card'
import './service-list.css'

const ServiceList = ({ data }) => {

    return (
        <div className='service-list'>
            <h2 className='title'>Service List</h2>
            <ul >{ 
                data.map((item) => {
                    const { id, title, address } = item
                    return <ServiceCard key={id}
                                title={title} 
                                address={address}/>
                }) 
            }</ul>
        </div>
    )
}

export default ServiceList