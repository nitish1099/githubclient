import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../theme';


const RepoListItemSeperatorComponent = ({
    style,
}) => (
    <View style={styles.container} />
);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 0.7,
        backgroundColor: theme.colors.blueGrayLight,
    }
});
export { RepoListItemSeperatorComponent as RepoListItemSeperator };
