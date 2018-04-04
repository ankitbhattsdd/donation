import { Dimensions } from 'react-native';

// locaL API URL
//export const SERVER_URL = 'http://108.168.203.227/donationapp/api/';
// live API URL
export const SERVER_URL = 'https://api.bridgetouganda.org/api/'; 

// font size
export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
let windowHeight = Dimensions.get('window').height;
export const FONT_SIZE = {
    SIZE_018: windowHeight * 0.018,
    SIZE_020: windowHeight * 0.020,
    SIZE_022: windowHeight * 0.022,
    SIZE_024: windowHeight * 0.024,
    SIZE_025: windowHeight * 0.025,
    SIZE_026: windowHeight * 0.026,
    SIZE_027: windowHeight * 0.027,
    SIZE_028: windowHeight * 0.028,
    SIZE_029: windowHeight * 0.029,
    SIZE_030: windowHeight * 0.030,
    SIZE_032: windowHeight * 0.032,
    SIZE_035: windowHeight * 0.035,
    SIZE_037: windowHeight * 0.037,
    SIZE_039: windowHeight * 0.039,
}


