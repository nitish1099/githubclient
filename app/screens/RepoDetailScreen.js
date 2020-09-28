import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getRepoDetails } from '../actions';
import { Container, Button, Seperator } from '../components';
import theme from '../theme';
class RepoDetailScreen extends Component {
    constructor(props) {
        super(props);
    }

	componentDidMount() {
		this.props.getRepoDetails();
	}

	_formatNumber(number) {
		if (number > 1000) {
			return `${Math.round(number/1000 * 10) / 10}k`
		}
		return number;
	}

	_renderRepoOwnerInfo() {
		if (!this.props.loading && this.props.owner) {
			return (
				<View style={styles.ownerContainer}>
					<Image 
						style={styles.avatar} 
						source={{uri: this.props.owner.avatarUrl}}
					/>
					<Text style={styles.ownerName}>{this.props.owner.login}</Text>
				</View>
			)
		}
	}

	_renderRepoDetails() {
		if (!this.props.loading && this.props.repository) {
			return (
				<View style={styles.repoDetailContainer}>
					<Text style={styles.repoName}>{this.props.repository.name}</Text>
					<Text style={styles.repoDesc}>{this.props.repository.description}</Text>
					<View style={styles.repoLinkContainer}>
						<Octicons name="link" color={theme.colors.blueGray} size={18} />
						<Text style={styles.linkUrl}>{this.props.repository.homepageUrl}</Text>
					</View>
					<View style={styles.repoStarsAndForksContainer}>
						<View style={styles.repoStarContainer}>
							<Octicons name="star" color={theme.colors.blueGray} size={18} />
							<Text style={styles.linkUrl}>{this._formatNumber(this.props.repository.stargazerCount)} stars</Text>
						</View>
						<View style={styles.repoForkContainer}>
							<Octicons name="repo-forked" color={theme.colors.blueGray} size={18} />
							<Text style={styles.linkUrl}>{this._formatNumber(this.props.repository.forkCount)} forks</Text>
						</View>
					</View>
				</View>
			)
		}
	}

	_renderRepoWatchButton() {
		if(!this.props.loading && this.props.repository) {
			return (
				<Button style={{ marginTop: 30 }}>
					<Ionicons name="eye-outline" size={18} color={theme.colors.blue}/>
					<Text style={styles.watchButtonText}>Watch</Text>
				</Button>
			);
		}
	}

	_renderRepoStats() {
		if(!this.props.loading && this.props.repository) {
			return (
				<View>
					<View style={styles.repoStat}>
						<Text style={styles.statTitle}>Issues</Text>
						<Text style={styles.statValue}>{this._formatNumber(1823)}</Text>
					</View>
					<View style={styles.repoStat}>
						<Text style={styles.statTitle}>Pull Requests</Text>
						<Text style={styles.statValue}>{this._formatNumber(this.props.repository.pullRequests.totalCount)}</Text>
					</View>
					<View style={styles.repoStat}>
						<Text style={styles.statTitle}>Watchers</Text>
						<Text style={styles.statValue}>{this._formatNumber(this.props.repository.watchers.totalCount)}</Text>
					</View>
					<View style={[styles.repoStat, { marginBottom: 0 }]}>
						<Text style={styles.statTitle}>License</Text>
						<Text style={styles.statValue}>{this.props.repository.licenseInfo.name}</Text>
					</View>
				</View>
			);
		}
	}

	_renderRepoIssues() {
		
	}

    render() {
        return (
            <Container>
                <View style={styles.repoInfoContainer}>
					{this._renderRepoOwnerInfo()}
					{this._renderRepoDetails()}
					{this._renderRepoWatchButton()}
                </View>
				<Seperator />
				<View style={styles.repoStatsContainer}>
					{this._renderRepoStats()}
				</View>
				<Seperator />
				<View style={styles.repoIssuesContainer}>
					{this._renderRepoIssues()}
				</View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
	repoInfoContainer: {
		padding: 15,
		backgroundColor: theme.colors.darkGray
	},
	ownerContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	avatar: {
		width: 18,
		height: 18,
		borderRadius: 4
	},
	ownerName: {
		color: theme.colors.blueGray,
		fontSize: 16,
		marginLeft: 7.5
	},
	repoDetailContainer: {
		marginTop: 10
	},
	repoName: {
		color: theme.colors.white,
		fontSize: 24,
		fontWeight: 'bold'
	},
	repoDesc: {
		marginTop: 10,
		fontSize: 16,
		color: theme.colors.white
	},
	linkIcon: {
		width: 16,
		height: 16
	},
	repoLinkContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 20,
	},
	linkUrl: {
		color: theme.colors.white,
		marginLeft: 7.5,
		fontSize: 16
	},
	repoStarsAndForksContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
	},
	repoStarContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	repoForkContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 15
	},
	watchButtonText: {
		color: theme.colors.blue,
		fontSize: 18,
		marginLeft: 10
	},
	repoStatsContainer: {
		padding: 15,
		backgroundColor: theme.colors.darkGray
	},
	repoStat: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 30
	},
	statTitle: {
		fontSize: 16,
		color: theme.colors.white
	},
	statValue: {
		fontSize: 16,
		color: theme.colors.blueGray
	}
});

const mapStateToProps = ({ repo }, ownProps) => {
	return {
		loading: repo.infoLoading,
		repository: repo.selected && repo.selected.repositories[repo.selected.id],
		owner: repo.selected && repo.selected.repositories[repo.selected.id].isInOrganization ? 
		repo.selected && repo.selected.organizations[repo.selected.repositories[repo.selected.id].owner] : 
		repo.selected && repo.selected.users[repo.selected.repositories[repo.selected.id].owner],
		issues: repo.selected && repo.selected.issues
    };
};

export default connect(mapStateToProps, { getRepoDetails })(RepoDetailScreen);