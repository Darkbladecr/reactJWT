import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Quotes extends Component {
	render() {
		const {
			onQuoteClick,
			onSecretQuoteClick,
			isAuthenticated,
			quote,
		} = this.props;

		return (
			<div>
				{!isAuthenticated && (
					<div>
						<div className="col-sm-3">
							<button onClick={onQuoteClick} className="btn btn-primary">
								Get Quote
							</button>
						</div>
						<div className="col-sm-6">
							{quote && (
								<div>
									<blockquote>{quote.message}</blockquote>
								</div>
							)}
						</div>
					</div>
				)}

				{isAuthenticated && (
					<div>
						<div className="col-sm-3">
							<button onClick={onSecretQuoteClick} className="btn btn-warning">
								Get Secret Quote
							</button>
						</div>
						<div className="col-sm-6">
							{quote && (
								<div>
									<span className="label label-danger">Secret Quote</span>
									<hr />
									<blockquote>{quote.message}</blockquote>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		);
	}
}

Quotes.propTypes = {
	onQuoteClick: PropTypes.func.isRequired,
	onSecretQuoteClick: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	quote: PropTypes.object,
};
