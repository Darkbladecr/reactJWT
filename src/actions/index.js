export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const QUOTE_REQUEST = 'QUOTE_REQUEST';
export const QUOTE_SUCCESS = 'QUOTE_SUCCESS';
export const QUOTE_FAILURE = 'QUOTE_FAILURE';

function requestLogin(creds) {
	return {
		type: LOGIN_REQUEST,
		isFetching: true,
		isAuthenticated: false,
		creds,
	};
}

function receiveLogin(jwt) {
	return {
		type: LOGIN_SUCCESS,
		isFetching: false,
		isAuthenticated: true,
		jwt: jwt,
	};
}

function loginError(message) {
	return {
		type: LOGIN_FAILURE,
		isFetching: false,
		isAuthenticated: false,
		message,
	};
}

function requestLogout() {
	return {
		type: LOGOUT_REQUEST,
		isFetching: true,
		isAuthenticated: true,
	};
}

function receiveLogout() {
	return {
		type: LOGOUT_SUCCESS,
		isFetching: false,
		isAuthenticated: false,
	};
}

function requestQuote() {
	return {
		type: QUOTE_REQUEST,
		isFetching: true,
	};
}

function receiveQuote(quote) {
	return {
		type: QUOTE_SUCCESS,
		isFetching: false,
		quote,
	};
}

export function loginUser(creds) {
	const config = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: {
			username: creds.username,
			password: creds.password,
		},
	};

	return dispatch => {
		// We dispatch requestLogin to kickoff the call to the API
		dispatch(requestLogin(creds));

		return fetch('http://localhost:3001/login', config)
			.then(response =>
				response.json().then(jwt => {
					// If login was successful, set the token in local storage
					localStorage.setItem('token', jwt);
					// Dispatch the success action
					dispatch(receiveLogin(jwt));
				})
			)
			.catch(err => console.log('Error: ', err));
	};
}

export function logoutUser() {
	return dispatch => {
		dispatch(requestLogout());
		localStorage.removeItem('token');
		dispatch(receiveLogout());
	};
}

export function fetchQuote() {
	const token = localStorage.getItem('token');
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};
	return dispatch => {
		dispatch(requestQuote());
		return fetch('http://localhost:3001/quote', config).then(response =>
			response
				.json()
				.then(quote => {
					dispatch(receiveQuote(quote));
				})
				.catch(err => console.log('Error: ', err))
		);
	};
}

export function fetchSecretQuote() {
	const token = localStorage.getItem('token');
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};
	return dispatch => {
		dispatch(requestQuote());
		return fetch('http://localhost:3001/secretQuote', config).then(response =>
			response
				.json()
				.then(quote => {
					dispatch(receiveQuote(quote));
				})
				.catch(err => console.log('Error: ', err))
		);
	};
}
