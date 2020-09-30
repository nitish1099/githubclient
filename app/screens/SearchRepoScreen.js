import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    searchRepos
} from '../actions';
import {
    Container,
    SearchBar,
    RepoListItem,
	Seperator,
	Loader
} from '../components';
import theme from '../theme';


class SearchRepoScreen extends Component {
    constructor(props) {
        super(props);
        this.timeout = 0;
		this._onSearchTextChange = this._onSearchTextChange.bind(this);
	}
	
	_renderFlatList() {
		const { organizations, repositories, users } = this.props.searchResult;
		if (!this.props.loading) {
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
		return (
			<Loader loading={this.props.loading} />
		)
	}

	_onRepoPress = (repoId) => {
		const repository = this.props.searchResult.repositories[repoId];
		this.props.navigation.navigate('RepoDetail', { repoId, repoName: repository.name });
	}

    _onSearchTextChange = (text) => {
		//add delay of 500ms to detect when user stops typing
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
			if (text.length > 3) // search only if string length is greater than 3
            this.props.searchRepos(text);
        }, 500);
    }

    render() {
        return (
            <Container>
                <SearchBar onChange={this._onSearchTextChange} />
                {this._renderFlatList()}
            </Container>
        );
    }
}


const mapStateToProps = ({ repo }, ownProps) => {
    return {
		loading: repo.searchLoading,
        searchResult: repo.searchResult
    };
};

export default connect(mapStateToProps, { searchRepos })(SearchRepoScreen);