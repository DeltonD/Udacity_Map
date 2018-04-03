import React, { Component } from 'react';
import ListItem from './ListItem.js'
import Place from './Place.js'

class SideBar extends Component {
    /* Checks if there is a selected place
     * If not, the app shows the list of places
     */
    render(){
        return(
            <aside id="searchbar">
                <datalist id="categories">
                    <option value="cat:0">Restaurants</option>
                    <option value="cat:1">Shops</option>
                    <option value="cat:2">Bars</option>
                </datalist>

                <input type="text" value={this.props.query} placeholder="Search" className="textbox" list='categories' onChange={this.props.onChange}/>
                <a className="clearbutton" onClick={this.props.clear}>×</a>
                {this.props.selectedPlace === null ?(
                    this.props.results.length > 0 ? (
                        <div className='list'>
                            {this.props.results.map(place => <ListItem click={this.props.click} key={place.id} place={place}/>)}
                            <div className="sidebarInfo">Data from <a href="http://foursquare.com">Foursquare ©</a></div>
                        </div>
                    ):(
                        <div className="sidebarInfo">Sem resultados</div>
                    )
                ):(
                    <Place place={this.props.selectedPlace}/>
                )}
            </aside>
        )
    }
}
export default SideBar;