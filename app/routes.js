import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
//Import screens 
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import SearchRepoScreen from './screens/SearchRepoScreen';
import UserScreen from './screens/UserScreen';
import WatchRepoScreen from './screens/WatchRepoScreen';
import RepoDetailScreen from './screens/RepoDetailScreen';
import CreateIssueScreen from './screens/CreateIssueScreen';
import theme from './theme';

//auth stack, if user is not authenticated
const authStack = createStackNavigator();

//main drawer, if user is authenticated
const mainStack = createStackNavigator();

//tab view
const Tab = createBottomTabNavigator();

Routes = (props) => {
	const [logged, setLogged] = useState(false)

	useEffect(() => {
		isLogged()
	}, [props.isLoggedIn])

	const isLogged = () => {
		console.log(props.isLoggedIn);

		if (props.isLoggedIn) {
			setLogged(true)
		} else {
			setLogged(false)
		}
	}

	const getHeaderTitle = (route) => {
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

	const Home = () => {
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
				<Tab.Screen name="Explore" component={SearchRepoScreen} />
				<Tab.Screen name="Watching" component={WatchRepoScreen} />
				<Tab.Screen name="User" component={UserScreen} />
			</Tab.Navigator>
		);
	}



	return (
		(!logged ?
			<authStack.Navigator
				screenOptions={{
					headerShown: false,
					headerStyle: {
						backgroundColor: theme.colors.darkGray,
						borderWidth: 0,
						elevation: 0
					},
					headerTintColor: '#fff',
				}}
			>
				<authStack.Screen name="Login" component={LoginScreen} />
				<authStack.Screen name="Register" component={RegisterScreen} />
			</authStack.Navigator>
			:
			<mainStack.Navigator
				screenOptions={{
					headerShown: true,
					headerStyle: {
						backgroundColor: theme.colors.darkGray,
						borderWidth: 0,
						elevation: 0
					},
					headerTintColor: '#fff',
				}}
			>
				<mainStack.Screen
					name="Home"
					component={Home}
					options={({ route }) => ({
						headerTitle: getHeaderTitle(route)
					})}
				/>
				<mainStack.Screen
					name="RepoDetail"
					component={RepoDetailScreen}
				/>
				<mainStack.Screen
					name="CreateIssue"
					component={CreateIssueScreen}
					options={() => ({
						headerTitle: 'Create Issue'
					})}
				/>
			</mainStack.Navigator>
		)
	)
}

const mapStateToProps = ({ auth }) => {
	return {
		isLoggedIn: auth.isLoggedIn
	}
}

export default connect(mapStateToProps, null)(Routes)