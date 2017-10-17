import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuote, fetchSecretQuote } from '../actions';
import Login from '../components/Login';
import Navbar from '../components/Navbar';
import Quotes from '../components/Quotes';

class App extends Component {
	render() {
		const {
			dispatch,
			quote,
			isAuthenticated,
			errorMessage,
			username,
		} = this.props;
		return (
			<div>
				<Navbar
					isAuthenticated={isAuthenticated}
					errorMessage={errorMessage}
					dispatch={dispatch}
					username={username}
				/>
				<div className="container">
					<Quotes
						onQuoteClick={() => dispatch(fetchQuote())}
						onSecretQuoteClick={() => dispatch(fetchSecretQuote())}
						isAuthenticated={isAuthenticated}
						quote={quote}
					/>
				</div>
			</div>
		);
	}
}

App.propTypes = {
	dispatch: PropTypes.func.isRequired,
	quote: PropTypes.object,
	isFetching: PropTypes.bool.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	errorMessage: PropTypes.string,
	username: PropTypes.string,
};

// These props come from the application's
// state when it is started
function mapStateToProps(state) {
	const { quote, auth } = state;
	const { isFetching, isAuthenticated, errorMessage, username } = auth;

	return {
		quote,
		isFetching,
		isAuthenticated,
		errorMessage,
		username,
	};
}

export default connect(mapStateToProps)(App);
