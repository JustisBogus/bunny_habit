import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import habitsReducer from './reducers/habits';
import { reducer as formReducer } from 'redux-form';
import auth from "./reducers/auth";
import { tokenMiddleware } from '../middleware';

const rootReducer = combineReducers({
    habits: habitsReducer,
    form: formReducer,
    auth
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk, tokenMiddleware));
};

export default configureStore;