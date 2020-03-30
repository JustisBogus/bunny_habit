import { USER_LOGIN_SUCCESS } from './actionTypes';
import { requests } from '../../agent';

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
            console.log('Login failed');
        });
    };
};