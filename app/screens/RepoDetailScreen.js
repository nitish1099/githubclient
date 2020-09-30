import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getRepoDetails, watchRepo } from '../actions';
import { Container, Button, Seperator, IssueListItem, Loader } from '../components';
import theme from '../theme';
import { FlatList } from 'react-native-gesture-handler';

class RepoDetailScreen extends Component {

	constructor(props) {
		super(props);
		this._onWatchRepoPress = this._onWatchRepoPress.bind(this);
		this._onAddIssuePress = this._onAddIssuePress.bind(this);
	}

	componentDidMount() {
		if (this.props.route.params) {
			this.props.getRepoDetails(this.props.route.params.repoId);
			//set header title as the repo name
			this.props.navigation.setOptions({
				headerTitle: this.props.route.params.repoName
			});
		}
		
	}

	_formatNumber(number) {
		// format 1200 as 1.2k
		if (number > 1000) {
			return `${Math.round(number / 1000 * 10) / 10}k`
		}
		return number;
	}

	_renderRepoOwnerInfo() {
		if (!this.props.loading && this.props.owner) {
			return (
				<View style={styles.ownerContainer}>
					<Image
						style={styles.avatar}
						source={{ uri: this.props.owner.avatarUrl }}
					/>
					<Text style={styles.ownerName}>{this.props.owner.login}</Text>
				</View>
			)
		}
	}

	_onWatchRepoPress() {
		if (!this.props.isWatched) {
			this.props.watchRepo(
				this.props.selected.repositories,
				this.props.selected.organizations,
				this.props.selected.users,
				this.props.userID
			);
		}
		
	}

	_onAddIssuePress() {
		this.props.navigation.navigate('CreateIssue');
	}

	_renderRepoHomepageLink() {
		if (this.props.repository.homepageUrl) {
			return (
				<View style={styles.repoLinkContainer}>
					<Octicons name="link" color={theme.colors.blueGray} size={18} />
					<Text style={styles.linkUrl}>{this.props.repository.homepageUrl}</Text>
				</View>
			)
		}
	}

	_renderRepoDetails() {
		if (this.props.repository) {
			return (
				<View style={styles.repoDetailContainer}>
					<Text style={styles.repoName}>{this.props.repository.name}</Text>
					<Text style={styles.repoDesc}>{this.props.repository.description}</Text>
					{this._renderRepoHomepageLink()}
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
		//set active color on button if already watching
		if (this.props.repository) {
			const color = this.props.isWatched ? theme.colors.green : theme.colors.blue;
			const text = this.props.isWatched ? 'Watching' : 'Watch';
			return (
				<Button style={{ marginTop: 30 }} onPress={this._onWatchRepoPress}>
					<Ionicons name="eye-outline" size={18} color={color} />
					<Text style={[styles.watchButtonText, { color }]}>{text}</Text>
				</Button>
			);
		}
	}

	_renderRepoLicenseStat() {
		if (this.props.repository.license) {
			return (
				<View style={[styles.repoStat, { marginBottom: 0 }]}>
					<Text style={styles.statTitle}>License</Text>
					<Text style={styles.statValue}>{this.props.repository.licenseInfo.name}</Text>
				</View>
			)
		}
	}

	_renderRepoStats() {
		if (this.props.repository) {
			return (
				<View>
					<View style={styles.repoStat}>
						<Text style={styles.statTitle}>Issues</Text>
						<Text style={styles.statValue}>{this._formatNumber(this.props.repository.issues.totalCount)}</Text>
					</View>
					<View style={styles.repoStat}>
						<Text style={styles.statTitle}>Pull Requests</Text>
						<Text style={styles.statValue}>{this._formatNumber(this.props.repository.pullRequests.totalCount)}</Text>
					</View>
					<View style={styles.repoStat}>
						<Text style={styles.statTitle}>Watchers</Text>
						<Text style={styles.statValue}>{this._formatNumber(this.props.repository.watchers.totalCount)}</Text>
					</View>
					{this._renderRepoLicenseStat()}
				</View>
			);
		}
	}

	_renderRepoIssues() {
		return (
			Object.keys(this.props.issues || []).map((item, index) => {
				if (index < 5) {
					return (
						<View>
							<IssueListItem
								currentIssue={item}
								issues={this.props.issues}
								owner={this.props.owner}
								repository={this.props.repository}
							/>
							{ index < 4 && <Seperator />}

						</View>

					)
				}
			})
		)
	}

	_renderRepoOnLoad() {
		if (this.props.loading) {
			return <Loader />
		}
		return (
			<ScrollView>
				<View style={styles.repoInfoContainer}>
						{this._renderRepoOwnerInfo()}
						{this._renderRepoDetails()}
						{this._renderRepoWatchButton()}
					</View>
					<Seperator />
					<View style={styles.repoStatsContainer}>
						{this._renderRepoStats()}
					</View>
					<View style={styles.repoIssuesContainer}>
						<View style={styles.repoIssueHeader}>
							<Text style={styles.headerTitle}>Issues</Text>
							<TouchableWithoutFeedback onPress={this._onAddIssuePress}>
								<View>
									<Ionicons color={theme.colors.blue} size={25} name={'add-circle-outline'} />
								</View>
							</TouchableWithoutFeedback>
						</View>
						{this._renderRepoIssues()}
					</View>
			</ScrollView>
			
		)
	}

	render() {
		return (
			<Container>
				{this._renderRepoOnLoad()}
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
	},
	repoIssuesContainer: {
		marginTop: 10,
		backgroundColor: theme.colors.darkGray
	},
	repoIssueHeader: {
		padding: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	headerTitle: {
		fontSize: 26,
		color: theme.colors.white
	}
});

const mapStateToProps = ({ repo, auth, watch }, ownProps) => {
	if (repo.selected && repo.selected.repositories) {
		console.log(repo.selected.id, repo.selected.repositories);
	}
	//get watched repos by the user
	const userID = auth.user.id;
	const watchedRepos = watch.userWatchedRepos.find(repo => repo.userID === userID);
	const isWatched = repo.selected && watchedRepos ? watchedRepos.list.repositories.hasOwnProperty(repo.selected.id) : false;
	return {
		userID,
		loading: repo.infoLoading,
		selected: repo.selected,
		repository: repo.selected && repo.selected.repositories && repo.selected.repositories[repo.selected.id],
		owner: repo.selected && repo.selected.repositories && repo.selected.repositories[repo.selected.id].isInOrganization ?
			repo.selected && repo.selected.repositories && repo.selected.organizations[repo.selected.repositories[repo.selected.id].owner] :
			repo.selected && repo.selected.repositories && repo.selected.users[repo.selected.repositories[repo.selected.id].owner],
		issues: repo.selected && repo.selected.issues,
		isWatched
	};
};

export default connect(mapStateToProps, { getRepoDetails, watchRepo })(RepoDetailScreen);