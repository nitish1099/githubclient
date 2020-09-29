import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../theme';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
	relativeTime: {
	  future: "in %s",
	  past: "%s ago",
	  s: '1s',
	  m: "1m",
	  mm: "%dm",
	  h: "1h",
	  hh: "%dh",
	  d: "1d",
	  dd: "%dd",
	  M: "1m",
	  MM: "%dm",
	  y: "1y",
	  yy: "%dy"
	}
  })



const IssueListItemComponent = ({
	currentIssue,
	issues,
	repository,
	owner
}) => {

	const _renderComments = () => {
		if (issues[currentIssue].comments.totalCount !== 0)
		return (
			<View style={styles.commentCountContainer}>
				<Text style={styles.commentCount}>{issues[currentIssue].comments.totalCount}</Text>
			</View>
		);
	}

	return(
	<View style={styles.container}>
		<View style={styles.issueMetaInfo}>
			<View style={styles.issueNumberContainer}>
				<Ionicons name={'alert-circle-outline'} color={theme.colors.green} size={22} />
				<Text style={styles.issueNumber}>{owner.login} / {repository.name} #{issues[currentIssue].number}</Text>
			</View>
			<Text style={styles.timestamp}>{dayjs(issues[currentIssue].publishedAt).fromNow(true)}</Text>
		</View>
		<View style={styles.issueDetailContainer}>
			<Text style={styles.issueTitle}>{issues[currentIssue].title}</Text>
			{_renderComments()}
		</View>
			
	</View>
)};

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.darkGray,
		padding: 15
	},
	issueMetaInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	issueNumberContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	issueNumber: {
		color: theme.colors.blueGray,
		fontSize: 16,
		marginLeft: 10
	},
	timestamp: {
		color: theme.colors.blueGray,
		fontSize: 16,
	},
	issueDetailContainer: {
		marginLeft: 32,
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	issueTitle: {
		fontSize: 16,
		lineHeight: 18,
		color: theme.colors.white,
		flex: 1
	},
	commentCountContainer: {
		height: 25,
		width: 23,
		borderRadius: 4,
		borderWidth: 0.5,
		borderColor: theme.colors.lightGrayBorder,
		backgroundColor: theme.colors.lightGray,
		justifyContent: 'center',
		alignItems: 'center',
	},
	commentCount: {
		fontSize: 16,
		color: theme.colors.offWhite
	}

});

export { IssueListItemComponent as IssueListItem };
