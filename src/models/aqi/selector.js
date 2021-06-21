import _ from 'lodash'
import { createSelector } from 'reselect'

const UPDATE_HISTORY_COUNT = 20;

export const getRoot = state => state.aqi;

export const getData = state => getRoot(state).data;

export const getHistory = state => getRoot(state).history;

export const getDataFromUpdate = createSelector(
    getData,
    (_state, update) => update,
    (data, update) => _.reduce(update, (finalData, cityUpdate) => {
        finalData[cityUpdate.city] = { aqi: cityUpdate.aqi, lastUpdate: Date.now() };
        return finalData;
    }, data)
)

export const getHistoryFromUpdate = createSelector(
    getHistory,
    (_state, data) => data,
    (history, data) => {
        history.push({ time: Date.now(), data })
        if (history.length > UPDATE_HISTORY_COUNT) {
            history.shift();
        }
        return history;
    }
)