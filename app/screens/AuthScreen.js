import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { authorize } from 'react-native-app-auth';
import { Container } from '../components';
import theme from '../theme';


const config = {
    redirectUrl: 'com.githubclient://oauthredirect',
    clientId: 'a9c4386ccb238e9a51f5',
    clientSecret: 'fd2a4650e8239f7a849981dc0dd5eb2530fd6aeb',
    scopes: ['user', 'repo'],
    serviceConfiguration: {
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        tokenEndpoint: 'https://github.com/login/oauth/access_token',
        revocationEndpoint:
            'https://github.com/settings/connections/applications/a9c4386ccb238e9a51f5'
    }
};

class AuthScreen extends Component {
    constructor(props) {
        super(props);
        this._onAuthPress = this._onAuthPress.bind(this);
    }

    async _onAuthPress() {
        try {
            const result = await authorize(config);
            // result includes accessToken, accessTokenExpirationDate and refreshToken
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Text style={styles.text}>AuthScreen</Text>
                <Image source={theme.images.logo} style={styles.logo}></Image>
                <TouchableWithoutFeedback onPress={this._onAuthPress}>
                    <View style={styles.authButton}>
                        <Text style={styles.authButtonText}>SIGN IN</Text>
                    </View>
                </TouchableWithoutFeedback>
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
        marginBottom: 65
    },
    authButton: {
        backgroundColor: theme.colors.white,
        width: '90%',
        alignItems: 'center',
        height: 45,
        borderRadius: 8,
        justifyContent: 'center'
    },
    authButtonText: {
        fontSize: 18
    }
});

export default AuthScreen;
