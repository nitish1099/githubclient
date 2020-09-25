import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { TouchableNativeFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
//screens
import AuthScreen from './app/screens/AuthScreen';
import SearchRepoScreen from './app/screens/SearchRepoScreen';
import UserRepoScreen from './app/screens/UserRepoScreen';
import WatchRepoScreen from './app/screens/WatchRepoScreen';

//root reducer
import rootReducer from './app/reducers';
import theme from './app/theme';

// creating store from the reducers
const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  function Home() {
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'User') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else {
              iconName = focused ? 'eye' : 'eye-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          inactiveTintColor: theme.colors.blueGray,
          labelStyle: {
            fontSize: 13
          },
          style: {
            height: 60,
            paddingBottom: 5,
            paddingTop: 5,
            backgroundColor: theme.colors.darkGray, 
            borderTopWidth: 0, 
            elevation: 0
          }
        }}

      >
        <Tab.Screen name="User" component={UserRepoScreen} />
        <Tab.Screen name="Watching" component={WatchRepoScreen} />
        <Tab.Screen name="Search" component={SearchRepoScreen} />
      </Tab.Navigator>
    );
  }

	return (
		// providing store to the navigator
		<Provider store={store}>
			<NavigationContainer> 
				<Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          {store.getState().auth.isLoggedIn == true ? (
            <Stack.Screen
              name="Authenticate"
              component={AuthScreen}
            />
          ) : (
            <Stack.Screen name="Home" component={Home} />
          )}
					
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}