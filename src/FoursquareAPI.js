const base = "https://api.foursquare.com/v2/venues/explore";
const id= 'U0MZVAFJS0TNWLXDAPPWDR10P1KFVXIYCE20RRZY1C5JKGIA';
const secret= 'TTYFLQQEDH5G4YSAWW3FLFPORGN2PIZUHDYGZPU0542LOD0V';
var places = [];
var index = 0;
const categories = ['food', 'shops', 'drinks'];

//Returns a object with all the info i need
//Some places have missing info, so i replace them with "N/A"
var place = (p) =>{
    var url = p.categories[0].icon.prefix;
    var catName= url.substr(39, url.lastIndexOf("/") - 39);
    var catId = (catName === "food") ? 0 : (catName === "shops")? 1 : 2;
    var photo = p.photos.groups[0].items[0];
    return {
        id: index,
        name: p.name,
        phone: p.contact.formattedPhone ? p.contact.formattedPhone : 'N/A' ,
        url: p.url ? p.url : 'N/A',
        time: p.hours && p.hours.status ? p.hours.status : 'N/A',
        rating: p.rating,
        photo: photo.prefix + "300x300" + photo.suffix,
        address: p.location.formattedAddress[0],
        desc:p.categories[0].name,
        category: catId,
        position: {lat: p.location.lat, lng: p.location.lng},
    };
}

//This function loads some places of the choosen categories
export const loadAll = () => {
    var success = 0;
    return new Promise((resolve, reject) =>{
        categories.forEach((c)=>{
            window.$.ajax({
                url: base,
                data:{client_id:id, client_secret:secret, v:"20180323", ll:'40.751513,-73.979061', radius:100, limit:4, section: c, venuePhotos: 1},
                dataType: 'json',
                success:((data)=>{
                    success++;
                    data.response.groups[0].items.forEach((d)=>{
                        places.push(place(d.venue));
                        index++;
                    });
                    if(success === 3){
                        resolve(places);
                    }

                }),
                error:(()=>{
                    reject();
                })
            });
        })

    });
}
