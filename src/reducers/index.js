import { combineReducers } from 'redux';
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT_SUCCESS,
	QUOTE_REQUEST,
	QUOTE_SUCCESS,
} from '../actions';
import jwt from 'jsonwebtoken';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function auth(
	state = {
		isFetching: false,
		isAuthenticated: localStorage.getItem('token') ? true : false,
		username: localStorage.getItem('token')
			? jwt.decode(localStorage.getItem('token')).username
			: '',
		errorMessage: '',
	},
	action
) {
	switch (action.type) {
		case LOGIN_REQUEST:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				isAuthenticated: action.isAuthenticated,
				username: action.creds.username,
			});
		case LOGIN_SUCCESS:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				isAuthenticated: action.isAuthenticated,
				errorMessage: '',
			});
		case LOGIN_FAILURE:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				isAuthenticated: action.isAuthenticated,
				errorMessage: action.message,
			});
		case LOGOUT_SUCCESS:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				isAuthenticated: action.isAuthenticated,
				username: '',
			});
		case QUOTE_REQUEST:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
			});
		case QUOTE_SUCCESS:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
			});
		default:
			return state;
	}
}

// The quote reducer
function quote(state = {}, action) {
	switch (action.type) {
		case QUOTE_REQUEST:
			return Object.assign({}, state, action.quote);
		case QUOTE_SUCCESS:
			return Object.assign({}, state, action.quote);
		case LOGOUT_SUCCESS:
			return {};
		default:
			return state;
	}
}

// We combine the reducers here so that they
// can be left split apart above
const quotesApp = combineReducers({
	auth,
	quote,
});

export default quotesApp;
