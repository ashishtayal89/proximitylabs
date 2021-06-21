import { UPDATE, UPDATE_DATA, UPDATE_HISTORY, START } from "./actionTypes";


const initialState = {
    subcriptionId: "",
    data: {},
    update: {},
    history: [],
    isActive: false
}

function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case START:
            return { ...state, isActive: true, subcriptionId: payload.id };
        case UPDATE:
            return {
                ...state, update: payload
            };
        case UPDATE_DATA:
            return { ...state, data: { ...payload } };
        case UPDATE_HISTORY:
            return { ...state, history: [...payload] };
        default:
            return state;
    }
}

export default reducer;
