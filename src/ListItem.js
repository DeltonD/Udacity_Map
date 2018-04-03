import React, { Component } from 'react';

class ListItem extends Component{
    render(){
        const place = this.props.place;
        const name = (place.name.length < 10) ? place.name : place.name.slice(0,23);
        return(
            <div className='item' onClick={()=>{this.props.click(place.id);}}>
                <img src={place.photo} alt=''/>
                <h3>{name}</h3>
                <p>{place.address}</p>
                <span>{place.desc}</span>
            </div>
        )
    }
}
export default ListItem;