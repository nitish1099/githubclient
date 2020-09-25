import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import theme from '../theme';

const ContainerComponent = ({
    children,
    style
}) => (
    <View style={[styles.container, style]}>
        {children}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.black,
    }
});

export { ContainerComponent as Container };

