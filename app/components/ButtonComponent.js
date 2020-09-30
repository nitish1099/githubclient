import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Vibration } from 'react-native';
import theme from '../theme';

const ButtonComponent = ({
	children, style, disabled, onPress
}) => {
	const _onButtonPress = () => {
		Vibration.vibrate(10);
		onPress();
	};

	return (
		<TouchableWithoutFeedback onPress={_onButtonPress} disabled={disabled}>
			<View style={[styles.button, style]}>
				{children}
			</View>
		</TouchableWithoutFeedback>
	)
};

const styles = StyleSheet.create({
	button: {
		height: 45,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.colors.darkBlueGray,
		borderRadius: 8,
		elevation: 3,
	}
});

export { ButtonComponent as Button };
