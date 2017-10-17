import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './containers/App';
import quotesApp from './reducers';
import thunk from 'redux-thunk';
import api from './middleware/api';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
	quotesApp,
	composeWithDevTools(applyMiddleware(thunk))
);
let rootElement = document.getElementById('root');

render(
	<Provider store={store}>
		<App />
	</Provider>,
	rootElement
);
registerServiceWorker();
