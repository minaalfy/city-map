import loadGoogleMapsApi from 'load-google-maps-api';
import { MultipolygonToGPolygon, GeocodeLocation } from './utils';
import { MAP_KEY } from './constants';

export default class CityMap {
  constructor(cityCenter, cityBounds, mapElement, cityGeoJSON){
    this.center = cityCenter;
    this.bounds = cityBounds;
    this.mapElm = mapElement;
    this.geoJSON = cityGeoJSON;
    this.initMap();
  }
  // Init our city map
  async initMap() {
    try {
      let googleMaps = await loadGoogleMapsApi({key: MAP_KEY,libraries:['geometry']});
        this.map = new googleMaps.Map(this.mapElm, {
        restriction: {
          latLngBounds: this.bounds,
          strictBounds: false,
        },
        streetViewControl: false, mapTypeControl: false, fullscreenControl: false
      });
      this.fitBounds();

      this.polygon = MultipolygonToGPolygon(this.geoJSON.features[0]);
      this.map.data.addGeoJson(this.geoJSON);
      this.map.data.setStyle({ strokeWeight: 1 });
      this.geocoder = new google.maps.Geocoder();
      this.addMarker();
      this.infowindow = new google.maps.InfoWindow();
    } catch(err) {
      this.mapElm.innerHTML = err;
    }
  }
// Force map to fit our city bounds
  fitBounds(){
    const bounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(this.bounds.south, this.bounds.west),
      new window.google.maps.LatLng(this.bounds.north, this.bounds.east)
    );
    this.map.fitBounds(bounds);
  }
// Add our marker to the map
  addMarker(){
    this.marker = new google.maps.Marker({
      position: this.center,
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP
    });
    this.marker.addListener('dragend', this.markerDrag.bind(this));
    this.marker.addListener('dragstart', this.hideWindow.bind(this));
    this.marker.addListener('click', this.showWindow.bind(this));
  }
  showWindow(){
    if(this.address){
      this.infowindow.setContent(`<h4>${this.address}</h4>`);
      this.infowindow.open(this.map, this.marker);
    } else {
    // Trigger marker dragend to geocode initial address
      google.maps.event.trigger(this.marker, 'dragend', {
        latLng: new google.maps.LatLng(this.center.lat,this.center.lng)
      })
    }
  }
  hideWindow(){
    this.infowindow.close();
  }
// Handle marker on drag function
  async markerDrag(m) {
    if (window.google.maps.geometry.poly.containsLocation(m.latLng, this.polygon)) {
      try {
        const result = await GeocodeLocation(m.latLng, this.geocoder);
        this.address = result.address;
        this.markerValidCoords = m.latLng.toJSON();
        this.showWindow();
      } catch (error) {
        console.log(error);
      }
    } else {
      this.marker.setPosition((this.markerValidCoords || this.center));
    }
  }
}