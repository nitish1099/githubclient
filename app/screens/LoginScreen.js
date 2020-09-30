import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, TextInput } from 'react-native';
import { authorize } from 'react-native-app-auth';
import { login, loginFormUpdate } from '../actions';
import { Container, Button } from '../components';
import theme from '../theme';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
		this._onLoginPress = this._onLoginPress.bind(this);
		this._onNewUserPress = this._onNewUserPress.bind(this);
    }

    _onLoginPress() {
		this.props.login(
			this.props.username, 
			this.props.password,
			this.props.registeredUsers
		)
	}
	
	//navigate to register screen
	_onNewUserPress() {
		this.props.navigation.navigate('Register');
	}

    render() {
		//check to disable the login button if password and username empty
		const disabled = !(this.props.password && this.props.username);

        return (
            <Container style={styles.container}>
                <Text style={styles.text}>AuthScreen</Text>
                <Image source={theme.images.logo} style={styles.logo}></Image>
				<View style={styles.inputContainer}>
					<TextInput 
						style={styles.textInput}
						placeholder={'Username'}
						value={this.props.username}
						selectionColor={theme.colors.blue}
						autoCapitalize={'none'}
						onChangeText={text => this.props.loginFormUpdate(text, 'username')}
					/>
					<Text></Text>
				</View>
				<View style={styles.inputContainer}>
					<TextInput 
						style={styles.textInput}
						placeholder={'Password'}
						value={this.props.password}
						selectionColor={theme.colors.blue}
						onChangeText={text => this.props.loginFormUpdate(text, 'password')}
						secureTextEntry
					/>
					<Text></Text>
				</View>
				
				<Button 
					style={styles.loginButton} 
					onPress={this._onLoginPress}
					disabled={disabled}
				>
					<Text 
						style={[
							styles.loginText, 
							{ color: disabled ? theme.colors.offWhite : theme.colors.blue }
						]}>Login</Text>
				</Button>
				<Text style={styles.newUser} onPress={this._onNewUserPress}>New User?</Text>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        resizeMode: 'contain',
        height: 75,
        width: 75,
        marginBottom: 35
	},
	inputContainer: {
		width: '90%',
		marginTop: 5
	},
    textInput: {
        backgroundColor: theme.colors.white,
        alignItems: 'center',
        height: 45,
        borderRadius: 8,
		justifyContent: 'center',
		fontSize: 18,
		paddingLeft: 15,
	},
	loginButton: {
		width: '90%',
		marginTop: 30
	},
	loginText: {
		color: theme.colors.blue,
		fontSize: 18,
		marginLeft: 10
	},
	newUser: {
		fontSize: 16,
		marginTop: 20,
		color: theme.colors.green
	}
});

const mapStateToProps = ({ auth }, ownProps) => {
    return {
		username: auth.login.username,
		password: auth.login.password,
		registeredUsers: auth.registeredUsers
    };
};

export default connect(mapStateToProps, { login, loginFormUpdate })(LoginScreen);