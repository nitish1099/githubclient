import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { View, StatusBar, Button } from 'react-native';
//import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
//root reducer
import rootReducer from './app/reducers';
import Routes from './app/routes';
import theme from './app/theme';

// creating store from the reducers
const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk, logger));

export default function App() {
	
	return (
		// providing store to the navigator
		<Provider store={store}>
			<View style={{ flex: 1 }}>
				<StatusBar
					backgroundColor={theme.colors.darkGray}
					barStyle="light-content"
				/>
				<NavigationContainer>
					<Routes />
				</NavigationContainer>
			</View>
		</Provider>
	);
}
