import * as Icons from './Icons.js';
var markers = [];
var map = null;
var style = [{featureType: "all", elementType: "labels", stylers: [{ visibility: "off" }]}];
var myLatLng = {lat: 40.751613, lng: -73.979061};

//This is the function that adds markers to the map
//First i define the marker apperance, then i set the click listener
export function addMarker(place, map, onClick) {
    var icon = Icons.getIcon(place.category);
    var marker = new window.google.maps.Marker({
        position: place.position,
        icon: {
            url: icon.url,
            labelOrigin: new window.google.maps.Point(15, 40)
        },
        label: {
            text: place.name,
            fontWeight: 'bold',
            fontFamily: 'Verdana, Geneva, sans-serif',
            color: icon.color
        },
        cCategory: place.category,
        map: map
    });

    marker.addListener('click', function() {
        onClick(place.id);
        bounceMarker(place.id);
    });
    markers.push(marker);
}
export function bounceMarker(id){
    markers[id].setAnimation(window.google.maps.Animation.BOUNCE);
    window.setTimeout(function() {
           markers[id].setAnimation(null);
    }, 1000);
}
//Default function to setup a map
export const createMap = () => {
    map = new window.google.maps.Map(document.getElementById('map'), {center: myLatLng, zoom: 18, styles: style});
    return map;
}

//Here i filter the places matching the query
export const filter = (query) =>{
    markers.forEach((marker) =>{
        var condition = (query.substr(0,4) === "cat:")? marker.cCategory === parseInt(query.substr(4, 1), 10) :  marker.label.text.toLowerCase().includes(query.toLowerCase());
        if(condition !== false){
            marker.setMap(map);
        }else{
            marker.setMap(null)
        }
    });
}


