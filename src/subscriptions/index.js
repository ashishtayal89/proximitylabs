import _ from "lodash";
import utils from "../utils";

const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";

const subscriptionEndpoints = { aqi: { url: `${wsProtocol}://city-ws.herokuapp.com`, socket: null } };

let isInitialized;

let subscribersList;

let subscriptions = {};

const _subscriptions = {
    subscribe: function (subsType, subsHandler) {
        if (_.keys(subscribersList[subsType]).length === 0) {
            const ws = new WebSocket(subscriptionEndpoints[subsType].url);
            ws.onmessage = (e) => {
                const message = JSON.parse(e.data);
                _handleMessage(subsType, message);
            }
            subscriptionEndpoints[subsType].socket = ws;
            subscriptions[subsType].isActive = true;
        }
        const key = utils.createRandomString(8);
        subscribersList[subsType][key] = subsHandler;
        return key;
    },
    unsubscribe: function (subsType, subsKey) {
        delete subscribersList[subsType][subsKey];
        if (_.keys(subscribersList[subsType]).length === 0) {
            subscriptionEndpoints[subsType].socket.close();
            subscriptions[subsType].isActive = false;
        }
    }
}

const _handleMessage = function (subsType, message) {
    const subscribers = subscribersList[subsType];
    _.forEach(subscribers, (subscriber) => {
        subscriber(message);
    })
}

const _initializeSubscriptions = function () {
    _.forEach(subscriptionEndpoints, (_subsEndpoint, subsType) => {
        subscriptions = _.defaults({
            [subsType]: {
                subscribe: _subscriptions.subscribe.bind(this, subsType),
                unsubscribe: _subscriptions.unsubscribe.bind(this, subsType),
                isActive: false
            }
        }, subscriptions);
    });
}

const _initSubscriberList = function () {
    subscribersList = _.reduce(subscriptionEndpoints, (list, _subsEndpoint, subsType) => {
        list[subsType] = {};
        return list;
    }, {});
}

const _init = function () {
    if (!isInitialized) {
        _initializeSubscriptions();
        _initSubscriberList();
        isInitialized = true;
    }
}

_init();

export default subscriptions;