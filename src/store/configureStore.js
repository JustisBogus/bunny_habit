import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import habitsReducer from './reducers/habits';

const rootReducer = combineReducers({
    habits: habitsReducer
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;