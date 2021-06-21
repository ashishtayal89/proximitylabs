import { state } from './constants'

export const getLastUpdateTextFromTime = function (updateTime) {
    const miliSecondsDiff = Date.now() - updateTime;
    const secondsDiff = (miliSecondsDiff / 1000).toFixed(0);
    const minutesDiff = (secondsDiff / 60).toFixed(0);
    const hoursDiff = (minutesDiff / 24).toFixed(0);
    const dateTime = new Date(updateTime).toString("MMM dd hh mm");

    if (secondsDiff < 60) {
        return `A few seconds ago`
    } else if (
        secondsDiff >= 60 && secondsDiff < 120
    ) {
        return `A minute ago`
    } else if (
        secondsDiff >= 120 && minutesDiff < 60
    ) {
        return `${minutesDiff} minutes ago`
    } else if (
        minutesDiff >= 60 && hoursDiff < 24
    ) {
        return `${hoursDiff} hours ago`
    } else {
        return `At ${dateTime}`;
    }
}

export const getAqiStageFromIndex = function (aqiIndex) {
    if (aqiIndex <= 50) {
        return state.GOOD;
    } else if (aqiIndex > 50 && aqiIndex <= 100) {
        return state.SATISFACTORY
    } else if (aqiIndex > 100 && aqiIndex <= 200) {
        return state.MODERATE
    } else if (aqiIndex > 200 && aqiIndex <= 300) {
        return state.POOR
    } else if (aqiIndex > 300 && aqiIndex <= 400) {
        return state.VERYPOOR
    } else {
        return state.SEVERE
    }
}

export const getLastNUpdates = function (history, count = 10) {
    const finalCount = history.length < count ? history.length : count;
    const lastN = -1 * finalCount;
    return history.slice(lastN);
}