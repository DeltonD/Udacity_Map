import React, { Component } from 'react';
import * as Foursquare from './FoursquareAPI.js';
import SideBar from './SideBar.js';
import * as Maps from './MapsAPI.js'

//This solution for loading the scripts was taken from https://stackoverflow.com/questions/42847126/script-load-in-react
//Here i return a promisse that only resolves when the array of scripts is loaded
function load(scripts) {
  return new Promise(function(resolve, reject){
    var count = 0;
    scripts.forEach((src) => {
        var script = document.createElement('script');
        script.src = src;
        script.addEventListener('error', (e)=> {
            alert("An API Failed to Load");
        });
        script.onload= ()=> {
            count++;
            if(count === scripts.length){
                resolve();
            }
        }
        document.body.appendChild(script);
    })
  })
};


class Map extends Component {
    state = {
        query : '',
        results: [],
        selectedPlace: null
    }

    componentDidMount(){
        load(['https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCf57QPinOHyMpb61acIuLAg6TSSU_0FH4']).then(()=>{this.scriptsLoaded()});
    }

    placeOnClick(e){
        this.setState({selectedPlace: this.state.results[e]});
        Maps.bounceMarker(e);
        this.props.toggleSideBar();
    }

    loadAll(m, p){
        p.forEach((r)=>{Maps.addMarker(r, m, (e)=>{this.placeOnClick(e);})});
    }

    scriptsLoaded(){
        var map = Maps.createMap();
        Foursquare.loadAll().then((r) => {
            this.setState({results: r});
            this.loadAll(map, r);
        }).catch(()=>{
            alert("The app failed to gather data from Foursquare.");
        });
    }

    onQueryChange = (e) =>{
        Maps.filter(e.target.value);
        this.setState({query: e.target.value})
        console.log("mudou");
    }

    //Here i return only the places matching the filters
    results(){
        if(this.state.query !== null){
            return this.state.results.filter(place=> (this.state.query.substr(0,4) === "cat:")? place.category === parseInt(this.state.query.substr(4, 1), 10) :  place.name.toLowerCase().includes(this.state.query.toLowerCase()));
        }else{
            return this.state.results;
        }
    }

    //Resets any filter applied
    clear(){
        this.setState({query: '', selectedPlace: null});
        Maps.filter('');
    }

    render(){
        return(
            <div id='content'>
            {this.props.search && <SideBar click={(e)=>{this.placeOnClick(e);}} onChange={this.onQueryChange} query={this.state.query} clear={()=>{this.clear();}} selectedPlace={this.state.selectedPlace} results={this.results()}/>}
            <div id="map"></div>
            </div>
        )
    }
}
export default Map;