### Steps to start app

1. Do `yarn install`
2. Do `yarn start`
3. Browse to `localhost:3000`

### Features

1. Home page shows a list of different city, aqi index, last updated status.
2. On click of any one city it opens a dialog showing a graphical representation of the cities last few aqi update.
3. You can see the last 10 or 20 updates.
4. You can compare the cities aqi with any other city.

### Technical Implementation

1. **Subscriptions** : A subscription service has been created which is bassed on the pubsub model. It is inteligent enough to start and stop the subscription based on the subscribers. It is scalable to miltiple subscription endpoints. It is modular and highly maintainable. This is plug and play service.

2. **Models/aqi** : The store contains 4 parts. It requires subscription service.

   - **Aqi Reducer** : Responsible for storing aqi data.
   - **Aqi Saga** : Responsible for starting and updating aqi subscription.
   - **Aqi Selector** : Responsible to provide the required aqi state and memoization
   - **Aqi Queries** : Resposible for to provide result based on custom business logic.

3. **Store** : It maintains application state.

4. **Components** : Handle the view of the application.

### Packages used

1. Redux : State Machine
2. React-Redux : Connector between view and state
3. React : View Library
4. Reselect : Memoization and business logic
5. Redux-saga : Middleware
6. Lodash : Array and Object manipulation library.
