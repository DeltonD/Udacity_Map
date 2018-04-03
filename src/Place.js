import React, { Component } from 'react';
import link from './icons/link.svg'
import pin from './icons/location.svg'
import phone from './icons/phone.svg'
import clock from './icons/clock.svg'
export default class Place extends Component{

    render(){
        return(
            <div className="place">
                <div className="img" style={{backgroundImage: `url(${this.props.place.photo})` }}/>
                <div className="header">
                    <h1>{this.props.place.name}</h1>
                    <p>Rating: {this.props.place.rating}/10</p>
                    <p>{this.props.place.desc}</p>
                </div>
                <div className="desc">

                    <div className="descItem"><img alt={pin} src={pin}/><span>{this.props.place.address}</span></div>

                    <div className="descItem"><img alt={phone} src={phone}/><span>{this.props.place.phone}</span></div>

                    <div className="descItem"><img alt={link} src={link}/><a target="_blank" href={this.props.place.url}>{this.props.place.url}</a></div>

                    <div className="descItem"><img alt={clock} src={clock}/><div>{this.props.place.time}</div></div>
                </div>
            </div>
        )
    }
}
