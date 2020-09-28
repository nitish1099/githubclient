import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { View,  StatusBar, Button } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
//screens
import AuthScreen from './app/screens/AuthScreen';
import SearchRepoScreen from './app/screens/SearchRepoScreen';
import UserRepoScreen from './app/screens/UserRepoScreen';
import WatchRepoScreen from './app/screens/UserRepoScreen';
import RepoDetailScreen from './app/screens/RepoDetailScreen';
//root reducer
import rootReducer from './app/reducers';
import theme from './app/theme';

// creating store from the reducers
const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk, logger));
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'User';

  switch (routeName) {
    case 'User':
      return 'User';
    case 'Explore':
      return 'Explore';
    case 'Watching':
      return 'Watching';
  }
}


  function Home() {
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'User') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Explore') {
              iconName = focused ? 'search' : 'search-outline';
            } else {
              iconName = focused ? 'eye' : 'eye-outline';
            }

            // You can return any component that you like here!
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
        <Tab.Screen name="Explore" component={SearchRepoScreen} />
      </Tab.Navigator>
    );
  }

	return (
		// providing store to the navigator
		<Provider store={store}>
      <View style={{ flex: 1 }}>
        <StatusBar 
          backgroundColor={theme.colors.darkGray}
          barStyle="light-content"
        />
        <NavigationContainer> 
				<Stack.Navigator screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.darkGray,
            borderWidth: 0,
            elevation: 0
          },
          headerTintColor: '#fff',
        }}>
          {store.getState().auth.isLoggedIn == true ? (
            <Stack.Screen
              name="Authenticate"
              component={AuthScreen}
            />
          ) : (
            <Stack.Screen 
              name="Home" 
              component={RepoDetailScreen} 
              options={({ route }) => ({
                headerTitle: getHeaderTitle(route)
              })} 
            />
          )}
          <Stack.Screen 
            name="RepoDetail" 
            component={RepoDetailScreen}
          />
				</Stack.Navigator>
			</NavigationContainer>
      </View>
		</Provider>
	);
}
