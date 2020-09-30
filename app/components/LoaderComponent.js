import React from 'react';
import { View, StyleSheet, ActivityIndicator  } from 'react-native';
import theme from '../theme';

const LoaderComponent = ({
	style, loading, size
}) => (
	<View style={[styles.loaderContainer, style]}>
		<ActivityIndicator
			color={theme.colors.blue} 
			size={size || 'large'} 
		/>
	</View>
);

const styles = StyleSheet.create({
	loaderContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export { LoaderComponent as Loader };
