import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { logout } from '../actions';
import { Container, Button } from '../components';
import theme from '../theme';


class UserScreen extends Component {
    constructor(props) {
		super(props);
		this._onLogoutPress = this._onLogoutPress.bind(this);
	}
	
	_onLogoutPress() {
		this.props.logout();
	}

    render() {
        return (
            <Container style={styles.container}>
                <Button style={styles.logoutButton} onPress={this._onLogoutPress}>
					<Text style={styles.logoutText}>Logout</Text>
				</Button>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	logoutButton: {
		marginTop: 20,
		width: '90%',
		alignSelf: 'center'
	},
	logoutText: {
		color: theme.colors.blue,
		fontSize: 18,
		marginLeft: 10
	},
});

const mapStateToProps = ({}, ownProps) => {
    return {};
};

export default connect(mapStateToProps, { logout })(UserScreen);
