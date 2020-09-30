import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, TextInput } from 'react-native';
import { authorize } from 'react-native-app-auth';
import { register, registerFormUpdate } from '../actions';
import { Container, Button } from '../components';
import theme from '../theme';

class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this._onRegisterPress = this._onRegisterPress.bind(this);
    }

    _onRegisterPress() {
		this.props.register(
			this.props.username, 
			this.props.password,
			this.props.registeredUsers
		)
    }

    render() {
		//check to disable the register button if password and username empty
		const disabled = !(this.props.password && this.props.username);
        return (
            <Container style={styles.container}>
                <Text style={styles.text}>AuthScreen</Text>
                <Image source={theme.images.logo} style={styles.logo}></Image>
				<View style={styles.inputContainer}>
					<TextInput 
						style={styles.textInput}
						placeholder={'Username'}
						autoCapitalize={'none'}
						selectionColor={theme.colors.blue}
						value={this.props.username}
						onChangeText={text => this.props.registerFormUpdate(text, 'username')}
					/>
					<Text></Text>
				</View>
				<View style={styles.inputContainer}>
					<TextInput 
						style={styles.textInput}
						placeholder={'Password'}
						value={this.props.password}
						onChangeText={text => this.props.registerFormUpdate(text, 'password')}
						secureTextEntry
					/>
					<Text></Text>
				</View>
				
				<Button 
					style={styles.registerButton} 
					onPress={this._onRegisterPress}
					disabled={disabled}
				>
					<Text 
						style={[
							styles.registerText, 
							{ color: disabled ? theme.colors.offWhite : theme.colors.blue }
						]}>Register</Text>
				</Button>
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
	registerButton: {
		width: '90%',
		marginTop: 30
	},
	registerText: {
		color: theme.colors.blue,
		fontSize: 18,
		marginLeft: 10
	}
});

const mapStateToProps = ({ auth }, ownProps) => {
    return {
		username: auth.register.username,
		password: auth.register.password,
		registeredUsers: auth.registeredUsers
    };
};

export default connect(mapStateToProps, { register, registerFormUpdate })(RegisterScreen);