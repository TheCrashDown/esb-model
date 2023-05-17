import React, { useState } from 'react';

import './workspace.css'
import ServiceCard from '../service-card';



export default class Workspace extends React.Component {

    state = {
        items: [],
        nextId: 100,
        lines: [],
        currentConnecting : -1
    }

    incId = () => {
        const current = this.state.nextId;
        this.setState((state) => {
            return {nextId: state.nextId + 1}
        })
        return current;
    }

    dragOverHadler = (e) => {
        e.preventDefault()
    }

    dragLeaveHadler = (e) => {

    }

    dropHadler = (e) => {
        const item = JSON.parse(e.dataTransfer.getData("item"))
        if (!item.fromWorkspace) {
            item.id = this.incId()
            item.x = e.clientX
            item.y = e.clientY
            console.log(item)
            this.setState((state) => {
                return {items: [...state.items, item]}
            })
        } else {
            let idx_deleted = this.state.items.findIndex(i => i.id === item.id)
            const currItems = [...this.state.items.slice(0, idx_deleted),
                               ...this.state.items.slice(idx_deleted + 1)]
            item.id = this.incId()
            item.x = e.clientX
            item.y = e.clientY
            console.log(item)
            this.setState((state) => {
                return {items: [...currItems, item]}
            })
        }
    }

    onConnectingStart = (id) => {
        console.log(id)
        this.setState(() => {
          return {currentConnecting: id}
        })
      }
  
    onConnectingEnd = (id) => {
    
    }

    render() {
        return (
            <div 
                onDragLeave={(e) => this.dragLeaveHadler(e)} 
                onDragOver={(e) => this.dragOverHadler(e)} 
                onDrop={(e) => this.dropHadler(e)} 
                className='space'>
                <h2 className='text'>Workspace</h2>

                <div>
                    {this.state.items.map(item => <ServiceCard key={item.id} 
                                                    id={item.id}
                                                    title={item.title} 
                                                    address={item.address}
                                                    x={item.x} 
                                                    y={item.y}
                                                    fromWorkspace={true}
                                                    conStart={() => this.onConnectingStart(item.id)}
                                                    conEnd={() => this.onConnectingEnd(item.id)}
                                                    />)}
                </div>


                <div className="lines">
                    {this.state.lines.map(line => <div key={line.id} className="line"/>)}

                </div>

            </div>
        )
    }
}
