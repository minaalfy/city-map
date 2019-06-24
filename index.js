import './style.css';
import 'babel-polyfill'
import CityMap from './citymap';

// import * as AbudhabiGeoData from './abudhabi.json';
// import { ABUDHABI_CENTER, ABUDHABI_BOUNDS } from './constants';
import { BERLIN_CENTER, BERLIN_BOUNDS} from './constants';
import * as BerlinGeoData from './berlin.json';

const appDiv = document.getElementById('map');

// new CityMap(ABUDHABI_CENTER, ABUDHABI_BOUNDS, appDiv, AbudhabiGeoData);
new CityMap(BERLIN_CENTER, BERLIN_BOUNDS, appDiv, BerlinGeoData);