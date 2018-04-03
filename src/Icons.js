//Here i get the default icons used by google maps

const api = "https://www.google.com.br/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v2-2-medium.png,assets/icons/poi/tactile/pinlet-2-medium.png,assets/icons/poi/quantum/pinlet/";

const icons = [{name: "restaurant", color: "ff9e67"}, {name: "shoppingbag", color: "4b96f3"}, {name: "bar", color: "ff9e67"}];

export const getIcon = (category) =>{
    var i = category;
    return {url:`${api}${icons[i].name}_pinlet-2-medium.png&highlight=ff000000,ffffff,${icons[i].color},ffffff&color=ff000000?scale=1`, color: `#${icons[i].color}`};
}
