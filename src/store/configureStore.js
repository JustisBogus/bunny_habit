import { createStore, combineReducers } from 'redux';

import habitsReducer from './reducers/habits';

const rootReducer = combineReducers({
    habits: habitsReducer
});

const configureStore = () => {
    return createStore(rootReducer);
};

export default configureStore;