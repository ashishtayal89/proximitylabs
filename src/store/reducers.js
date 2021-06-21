import { combineReducers } from "redux";

import aqiReducer from '../models/aqi/reducers'

function testReducer() {
    return "Hi";
}

export default combineReducers({
    test: testReducer,
    aqi: aqiReducer
});