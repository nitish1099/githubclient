import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import theme from '../theme';


const RepoLitItemComponent = ({
    organizations,
    repositories,
    users,
    currentRepository,
    style,
}) => {
    const repo = repositories[currentRepository];
    const author = organizations[repo.owner] ? 
    organizations[repo.owner]: 
    users[repo.owner];

    return (
        <View style={styles.container}>
            <View style={styles.orgDetails}>
                <Image 
                    source={{uri: author.avatarUrl}} 
                    style={styles.orgLogo}
                />
                <Text style={styles.orgName}>{author.login}</Text>
            </View>
            <View style={styles.repoDetails}>
                <Text style={styles.repoName}>{repo.name}</Text>
                <Text numberOfLines={3} style={styles.repoDesc}>{repo.description}</Text>
            </View>
            <View style={styles.repoStats}>
                <View style={styles.repoStars}>
                    <Octicons name="star" color={theme.colors.yellow} size={20} />
                    <Text style={styles.starCount}>{repo.stargazerCount}</Text>
                </View>
                {
                    repo.primaryLanguage &&
                    
                    <View style={styles.repoLanguage}>
                        <View style={[styles.dot, { backgroundColor: repo.primaryLanguage.color }]} />
                        <Text style={styles.starCount}>{repo.primaryLanguage.name}</Text>
                    </View>
                }
                
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 140,
        backgroundColor: theme.colors.darkGray,
        padding: 15
    },
    orgDetails: {
        flexDirection: 'row',
		alignItems: 'center'
    },
    orgLogo: {
        width: 20,
        height: 20,
        borderRadius: 4
    },
    orgName: {
        fontSize: 16,
        color: theme.colors.blueGray,
        marginLeft: 5
	},
	repoDetails: {
		marginTop: 5
	},
    repoName: {
        fontSize: 16,
        color: theme.colors.white
    },
    repoDesc: {
        fontSize: 16,
        color: theme.colors.offWhite
    },
    repoStats: {
        marginTop: 15,
        flexDirection: 'row',
        
    },
    repoStars: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    starCount: {
        color: theme.colors.blueGray,
        fontSize: 16,
        marginLeft: 7.5
    },
    repoLanguage: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5
    }
});
export { RepoLitItemComponent as RepoListItem };
