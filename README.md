# city-map
> Highlighted city map with restricted pan, zoom and marker drag allowed only inside the city.

# Demo
![Alt text](image.jpg?raw=true "Screen Shots")

**Don't forget to put your own google maps key inside constants.js file to make the demo work**

**[Berlin Map Demo](https://stackblitz.com/edit/city-map?file=constants.js)**

**[Abu Dhabi Map Demo](https://stackblitz.com/edit/city-map-abudhabi?file=constants.js)**

**[Cairo Map Demo](https://stackblitz.com/edit/cairo-city-map?file=constants.js)**

Or you can clone this repository and put your own google maps key inside constants.js then run `npm install` followed by `npm run dev`

# Features

- Map auto zoom on initialization to fit bounds of our city.
- Highlight city layer on map to guide the user.
- Restrict map drag/pan outside boundaries.
- Restrict marker drag to our city boundary only.

# Dependencies
- [load-google-maps-api](https://github.com/yuanqing/load-google-maps-api)
