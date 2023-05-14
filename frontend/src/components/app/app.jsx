import React from "react";

import './app.css'

import ServiceList from '../service-list'
import Workspace from '../workspace'



const App = () => {    
    const data = [
      {
        "id": 11,
        "title": "serv1",
        "address": "1.2.3.4"
      },
      {
        "id": 5,
        "title": "serv2",
        "address": "2.3.4.6"
      },
      {
        "id": 72,
        "title": "serv3",
        "address": "123.4.2.5"
      }
    ]
    return (
        <div className="app"> 
            <ServiceList data={data}/>
            <Workspace />
        </div>
    )
    
}

export default App