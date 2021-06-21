import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { getHistory, getData } from '../models/aqi/selector';
import { getLastNUpdates } from '../models/aqi/queries';
import "./AqiGraph.css";
import _ from 'lodash';

export default function AqiGraph({ selectedCity }) {
    const [updatesToShow, setUpdatesToShow] = useState(10);
    const [cityToCompare, setCityToCompare] = useState("");
    const history = useSelector(getHistory);
    const lastUpdate = useSelector(getData);
    const totalUpdates = history.length;
    const finalUpdatesToShow = updatesToShow > totalUpdates ? totalUpdates : updatesToShow;
    const graphHistory = getLastNUpdates(history, finalUpdatesToShow);
    const barWidth = updatesToShow > 10 ? 500 / updatesToShow : 50;
    const selectedCityBackground = "violet";
    const compareCityBackground = "purple";
    return (
        <div className="container">
            <div className="graphModifiers">
                <div className="cityToCompare">
                    <label>Compare with : </label>
                    <select value={cityToCompare} onChange={(e) => setCityToCompare(e.target.value)}>
                        <option key="" value="">Select city</option>
                        {_.map(_.keys(lastUpdate), (city) =>
                            city !== selectedCity && <option key={city} value={city}>{city}</option>
                        )}
                    </select>
                </div>
                <div className="updatesToShow" >
                    <label>Show last : </label>
                    <select value={updatesToShow} onChange={(e) => setUpdatesToShow(e.target.value)}>
                        <option key={10} value={10}>{10}</option>
                        <option key={20} value={20}>{20}</option>
                    </select>
                </div>
            </div>
            <div className="graphContainer">
                <div className="layers">
                    <div className="layer severe">SEVERE</div>
                    <div className="layer verypoor">VERY POOR</div>
                    <div className="layer poor">POOR</div>
                    <div className="layer moderate">MODERATE</div>
                    <div className="layer satisfactory">SATISFACTORY</div>
                    <div className="layer good">GOOD</div>
                </div>
                <div className="barContainer">
                    {_.map(graphHistory, ({ data }, index) => {
                        const selectedCityData = data[selectedCity] || { aqi: 0 };
                        const cityToCompareData = data[cityToCompare] || { aqi: 0 };

                        const selecteCityStyle = {
                            background: selectedCityBackground,
                            height: parseInt(selectedCityData.aqi),
                            width: barWidth,
                            left: (index * barWidth),
                            zIndex: cityToCompareData && (selectedCityData.aqi > cityToCompareData.aqi) ? 0 : 1
                        };

                        const cityToCompareStyle = cityToCompare && {
                            background: compareCityBackground,
                            height: parseInt(cityToCompareData.aqi),
                            width: barWidth,
                            left: (index * barWidth),
                            zIndex: cityToCompareData && (selectedCityData.aqi > cityToCompareData.aqi) ? 1 : 0
                        };

                        return (
                            <>
                                <div title={selectedCityData.aqi.toFixed(2)} className="bar" style={selecteCityStyle} key={`selected-${index}`}></div>
                                {cityToCompare && <div title={cityToCompareData.aqi.toFixed(2)} className="bar" style={cityToCompareStyle} key={`compare-${index}`}></div>}
                            </>
                        )
                    })}
                </div>
            </div>
            <div className="graphData">
                <div className="selectedCity">
                    <div className="colorScheme" style={{ background: selectedCityBackground }}></div>
                    <div> {selectedCity} {lastUpdate[selectedCity].aqi.toFixed(2)} </div>
                </div>
                {cityToCompare && <div className="cityToCompare">
                    <div className="colorScheme" style={{ background: compareCityBackground }}></div>
                    <div> {cityToCompare} {lastUpdate[cityToCompare].aqi.toFixed(2)} </div>
                </div>}
                <div className="updateMessage">
                    {`Showing ${finalUpdatesToShow} of ${totalUpdates}`}
                </div>
            </div>
        </div>
    )
}
