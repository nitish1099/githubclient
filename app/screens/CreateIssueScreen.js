import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TextInput, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { issueFormUpdate, createIssue } from '../actions';
import { Container, Loader } from '../components';
import theme from '../theme';

class CreateIssueScreen extends Component {
	constructor(props) {
		super(props);
		this._renderHeaderButton = this._renderHeaderButton.bind(this);
		this._onCreateIssuePress = this._onCreateIssuePress.bind(this);
	}

	_onCreateIssuePress() {
		this.props.createIssue(
			this.props.repoId, 
			this.props.issue.title, 
			this.props.issue.description,
			this.props.navigation
		)
	}

	// to render the top right header send button
	_renderHeaderButton() {
		const disabled = !this.props.issue.title;
		const color = disabled ? theme.colors.lightGrayBorder : theme.colors.blue;
		if (this.props.createIssueLoading) {
			return (
				<Loader size={22} style={{ marginRight: 15 }}/>
			)
		}
		return (
			<TouchableWithoutFeedback 
				disabled={disabled} 
				onPress={this._onCreateIssuePress}
			>
				<View style={styles.createButton}>
					<Ionicons name="send-outline" color={color} size={22} />
				</View>
			</TouchableWithoutFeedback>
		)
	}

	componentDidMount() {
		this.props.navigation.setOptions({
			headerRight: () => this._renderHeaderButton()
		})
	}

	componentDidUpdate() {
		// update the header button on text update
		this.props.navigation.setOptions({
			headerRight: () => this._renderHeaderButton()
		})
	}



	render() {
		return (
			<Container style={{ backgroundColor: theme.colors.darkBlueGray }}>
				<ScrollView>
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							placeholder="Title"
							placeholderTextColor={theme.colors.offWhite}
							autoFocus
							selectionColor={theme.colors.blue}
							onChangeText={text => this.props.issueFormUpdate(text, 'title')}
							value={this.props.issue.title}
						/>
					</View>
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.textarea}
							placeholder="Leave a comment (optional)"
							placeholderTextColor={theme.colors.offWhite}
							selectionColor={theme.colors.blue}
							multiline
							onChangeText={text => this.props.issueFormUpdate(text, 'description')}
							value={this.props.issue.description}
						/>
					</View>
				</ScrollView>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	createButton: {
		marginRight: 15
	},
	inputContainer: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 15
	},
	input: {
		fontSize: 20,
		color: theme.colors.offWhite
	},
	textarea: {
		fontSize: 18,
		color: theme.colors.offWhite
	}
});

const mapStateToProps = ({ repo }, ownProps) => {
	return {
		issue: repo.issue,
		repoId: repo.selected.id,
		createIssueLoading: repo.createIssueLoading
	};
};

export default connect(mapStateToProps, { issueFormUpdate, createIssue })(CreateIssueScreen);

