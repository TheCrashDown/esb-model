import React from 'react';

import './workspace.css'
import ServiceCard from '../service-card';



export default class Workspace extends React.Component {

    state = {
        items: [],
        nextId: 100,
        lines: [],
        connecting: 0,
        currentConnecting: {}
    }

    incId = () => {
        const current = this.state.nextId;
        this.setState((state) => {
            return { nextId: state.nextId + 1 }
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
                return { items: [...state.items, item] }
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
                return { items: [...currItems, item] }
            })
        }
    }

    onConnectingStart = (id, x1, y1) => {
        console.log("start")
        console.log(id, x1, y1)
        this.setState(() => {
            return { connecting: 1, currentConnecting: { id: id, x1: x1, y1: y1 } }
        })
    }

    onConnectingEnd = (id, x, y) => {
        console.log("end")
        console.log(this.state.currentConnecting)
        console.log(this.state.connecting)
        console.log(id, x, y)
        // console.log(this.state.currentConnecting === {})
        // console.log(this.state.currentConnecting.id === id)
        if (this.state.connecting === 0 || this.state.currentConnecting === {} || this.state.currentConnecting.id === id) {
            return
        }
        console.log("ending...")
        const x1 = this.state.currentConnecting.x1;
        const y1 = this.state.currentConnecting.y1;
        const x2 = x - 80;
        const y2 = y;
        const a = x1 - x2;
        const b = y1 - y2;
        const length = Math.sqrt(a * a + b * b);
        const angleDeg = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        const lineId = this.incId()
        console.log(x1, x2, a, b, length, angleDeg)
        this.setState((state) => {
            return {
                lines: [...state.lines, { id: lineId, x: x1 + 55, y: y1, deg: angleDeg, length: length }],
                currentConnecting: {},
                connecting: 0
            }
        })
        console.log(this.state.lines)
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
                        conStart={() => this.onConnectingStart(
                            item.id, item.x, item.y)}
                        conEnd={() => this.onConnectingEnd(item.id, item.x, item.y)}
                    />)}
                </div>


                <div className="lines">
                    {this.state.lines.map(line =>
                        <div
                            key={line.id}
                            className="line"
                            style={{
                                position: 'absolute',
                                width: line.length,
                                left: line.x,
                                top: line.y,
                                transform: "rotate(" + line.deg + "deg)"
                            }} />)}

                </div>

            </div>
        )
    }
}
