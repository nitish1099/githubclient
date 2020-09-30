import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import {
    Container,
    SearchBar,
    RepoListItem,
	Seperator,
	Loader
} from '../components';


class WatchRepoScreen extends Component {
	constructor(props) {
        super(props);
	}
	
	_renderFlatList() {
		const { organizations, repositories, users } = this.props.repos;
		return (
			<FlatList
				data={repositories ? Object.keys(repositories) : []}
				renderItem={({ item }) =>
					<RepoListItem
						organizations={organizations}
						repositories={repositories}
						users={users}
						currentRepository={item}
						onListItemPress={() => this._onRepoPress(item)}
						
					/>
				}
				keyExtractor={item => item}
				ItemSeparatorComponent={() => <Seperator />}
			/>
		)
	}

	_onRepoPress = (repoId) => {
		const repository = this.props.repos.repositories[repoId];
		this.props.navigation.navigate('RepoDetail', { repoId, repoName: repository.name });
	}

    render() {
        return (
            <Container>
                {this._renderFlatList()}
            </Container>
        );
    }
}


const mapStateToProps = ({ watch, auth }, ownProps) => {

	const userID = auth.user.id;
	const watchedRepos = watch.userWatchedRepos.find(repo => repo.userID === userID);
    return {
        repos: watchedRepos ? watchedRepos.list : []
    };
};

export default connect(mapStateToProps, {  })(WatchRepoScreen);
