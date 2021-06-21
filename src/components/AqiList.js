import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { getData } from '../models/aqi/selector';
import { getLastUpdateTextFromTime, getAqiStageFromIndex } from '../models/aqi/queries';
import Loader from './Loader'
import "./AqiList.css";

export default function AqiList({ showCityAqi }) {
    const aqiData = useSelector(getData);
    return _.keys(aqiData).length ? (
        <div className="aqiContainer">
            <table className="aqiTable">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>AQI</th>
                        <th>Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {_.map(aqiData, (cityAqi, city) => {
                        const aqiIndex = cityAqi.aqi.toFixed(2)
                        return (
                            <tr onClick={() => showCityAqi(city)} className={getAqiStageFromIndex(aqiIndex)} key={city}>
                                <td>{city}</td>
                                <td>{aqiIndex}</td>
                                <td>{getLastUpdateTextFromTime(cityAqi.lastUpdate)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    ) : <Loader />
}
