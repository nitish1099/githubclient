import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import theme from '../theme';

const SearchBarComponent = ({
    style,
    onChange
}) => (
    <View style={[styles.container, style]}>
        <TextInput 
            style={styles.input}
            placeholder="Search Github"
            underlineColorAndroid={theme.colors.blueGray}
            placeholderTextColor={theme.colors.blueGray}
            onChangeText={val => onChange(val)}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 65,
        backgroundColor: theme.colors.darkGray,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10
    },
    input: {
        color: theme.colors.blueGray,
        fontSize: 18,
    }
});

export { SearchBarComponent as SearchBar };

