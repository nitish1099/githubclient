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
    Seperator
} from '../components';
import theme from '../theme';


class SearchRepoScreen extends Component {
    constructor(props) {
        super(props);
        this.timeout = 0;
        this._onSearchTextChange = this._onSearchTextChange.bind(this);
    }

    _onSearchTextChange = (text) => {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.props.searchRepos(text);
        }, 500);
    }

    render() {
        const { organizations, repositories, users } = this.props.searchResult;
        return (
            <Container>
                <SearchBar onChange={this._onSearchTextChange} />
                <FlatList
                    data={repositories ? Object.keys(repositories) : []}
                    renderItem={({ item }) =>
                        <RepoListItem
                            organizations={organizations}
                            repositories={repositories}
                            users={users}
                            currentRepository={item}
                        />
                    }
                    ItemSeparatorComponent={() => <Seperator />}
                >
                </FlatList>
            </Container>
        );
    }
}


const mapStateToProps = ({ repo }, ownProps) => {
    return {
        searchResult: repo.searchResult
    };
};

export default connect(mapStateToProps, { searchRepos })(SearchRepoScreen);