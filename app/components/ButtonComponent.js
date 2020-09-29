import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import theme from '../theme';

const ButtonComponent = ({
	children, style, disabled, onPress
}) => (
	<TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
		<View style={[styles.button, style]}>
			{children}
		</View>
	</TouchableWithoutFeedback>
);

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

export {ButtonComponent as Button };
