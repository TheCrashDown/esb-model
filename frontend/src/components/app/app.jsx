import React from "react";

import './app.css'

import ServiceList from '../service-list'
import Workspace from '../workspace'



export default class App extends React.Component {
  state = {
    services: [
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
    ],

  }

  updateServices = () => {
    console.log("update services")

    fetch("http://127.0.0.1:8000/get_clients",
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
    )
      .then(res => res.json())
      .then(res => this.setState(() => {
        console.log(res)
        return {
          services: res.clients
        }
      }));

  }




  render() {
    return (
      <div className="app">
        <ServiceList data={this.state.services} updateServices={this.updateServices} />
        <Workspace />
      </div>
    )
  }

}
