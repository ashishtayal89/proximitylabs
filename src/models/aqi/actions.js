import { START, UPDATE, UPDATE_DATA, UPDATE_HISTORY } from './actionTypes'

export const start = function (id) {
    return {
        type: START,
        payload: { id }
    }
}

export const updateAQIData = function (payload) {
    return {
        type: UPDATE_DATA,
        payload
    }
}

export const updateAQIHistory = function (payload) {
    return {
        type: UPDATE_HISTORY,
        payload
    }
}

export const updateAQI = function (payload) {
    return {
        type: UPDATE,
        payload
    }
}