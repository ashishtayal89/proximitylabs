import { takeEvery, put } from "redux-saga/effects";
import subs from '../../subscriptions';
import store from '../../store';
import * as actions from './actions';
import { getDataFromUpdate, getHistoryFromUpdate } from './selector'
import { UPDATE } from './actionTypes';



function* update({ payload }) {
    const data = getDataFromUpdate(store.getState(), payload);
    const updateHistory = getHistoryFromUpdate(store.getState(), data);
    yield put(actions.updateAQIData(data));
    yield put(actions.updateAQIHistory(updateHistory));
}

function* handleUpdate() {
    yield takeEvery(UPDATE, update)
}

function* startSubscription() {
    const subsId = subs.aqi.subscribe((message) => {
        store.dispatch(actions.updateAQI(message))
    })
    yield put(actions.start(subsId));
}

const sagas = [startSubscription, handleUpdate];

export default sagas;





