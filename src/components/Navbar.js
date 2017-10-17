import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Login from './Login';
import Logout from './Logout';
import { loginUser, logoutUser } from '../actions';

export default class Navbar extends Component {
	render() {
		const { dispatch, isAuthenticated, errorMessage, username } = this.props;

		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">
						Quotes App
					</a>
					{username &&
						username.length > 0 && (
							<span className="navbar-text">{username}</span>
						)}
					<div className="navbar-form">
						{!isAuthenticated && (
							<Login
								errorMessage={errorMessage}
								onLoginClick={creds => dispatch(loginUser(creds))}
							/>
						)}

						{isAuthenticated && (
							<Logout onLogoutClick={() => dispatch(logoutUser())} />
						)}
					</div>
				</div>
			</nav>
		);
	}
}

Navbar.propTypes = {
	dispatch: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	errorMessage: PropTypes.string,
};
