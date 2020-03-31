import { USER_LOGIN_SUCCESS, USER_PROFILE_REQUEST, USER_PROFILE_ERROR, 
    USER_PROFILE_RECEIVED, 
    USER_SET_ID} from './actionTypes';
import { requests } from '../../agent';
import { SubmissionError } from 'redux-form';

export const userLoginSuccess = (token, userId) => {
    return {
        type: USER_LOGIN_SUCCESS,
        token,
        userId
    };
};

export const userLoginAttempt = (username, password) => {
    return (dispatch) => {
        return requests.post('/login_check', {username, password}, false).then(
            response => dispatch(userLoginSuccess(response.token, response.id))
        ).catch(error => {
            throw new SubmissionError({
                _error: 'Username or password is invalid' 
            })
        });
    };
};

export const userSetId = (userId) => {
    return {
        type: USER_SET_ID,
        userId
    };
};

export const userProfileRequest = () => {
    return {
        type: USER_PROFILE_REQUEST
    };
};

export const userProfileError = () => {
    return {
        type: USER_PROFILE_ERROR
    };
};

export const userProfileReceived = (userData) => {
    return {
        type: USER_PROFILE_RECEIVED,
        userData
    };
};

export const userProfileFetch = (userId) => {
    return (dispatch) => {
        dispatch(userProfileRequest());
        return requests.get(`/users/${userId}`, true).then(
            response => dispatch(userProfileReceived(userId, response))
        ).catch(error => dispatch(userProfileError()))
    };
};
