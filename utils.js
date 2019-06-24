// Convert multiPolygon to google polygon
export const MultipolygonToGPolygon = (geojson) => {
  let googleObj = [];
  for (let i = 0; i < geojson.geometry.coordinates.length; i++) {
    let paths = [];
    for (let j = 0; j < geojson.geometry.coordinates[i].length; j++) {
      let path = [];
      for (var k = 0; k < geojson.geometry.coordinates[i][j].length; k++) {
        let ll = new google.maps.LatLng(geojson.geometry.coordinates[i][j][k][1], geojson.geometry.coordinates[i][j][k][0]);
        path.push(ll);
      }
      paths.push(path);
    }
    googleObj.push(new google.maps.Polygon({ paths }));
  }
  return googleObj[0];
}

// Geocode marker position to return location Address
export function GeocodeLocation(latlng, geocodeService) {
  return new Promise(function (resolve, reject) {
    geocodeService.geocode({
      'location': latlng
    }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        resolve({address: results[0].formatted_address, latLng: results[0].geometry.location.toJSON() });
      } else {
        reject(new Error('Couldnt\'t find address for location ' + latlng));
      }
    })
  })
}