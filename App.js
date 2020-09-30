import 'react-native-gesture-handler';
import React from 'react';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { PersistGate } from 'redux-persist/integration/react';
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


//Transform: set login and register form values to null
const SetTransform = createTransform(
	// transform state being rehydrated
	(inboundState, key) => {
		return { ...inboundState  };
	},
	  (outboundState, key) => {
		return { 
			...outboundState, 
			login: {
				username: null,
				passworD: null
			},
			register: {
				username: null,
				passworD: null
			}  
		};
	  },
	// define which reducers this transform gets called for.
	{ whitelist: ['auth'] }
  );

// Middleware: Redux Persist Config
const persistConfig = {
	// Root
	key: 'root',
	storage: AsyncStorage,
	blacklist: [
		'repo'
	],
	transforms: [SetTransform]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
// creating store from the reducers
const store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk, logger));
const persistor = persistStore(store);

export default function App() {
	return (
		// providing store to the navigator
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<View style={{ flex: 1 }}>
					<StatusBar
						backgroundColor={theme.colors.darkGray}
						barStyle="light-content"
					/>
					<NavigationContainer>
						<Routes />
					</NavigationContainer>
				</View>
			</PersistGate>
		</Provider>
	);
}
