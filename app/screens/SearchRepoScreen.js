import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  searchRepos
} from '../actions';
import { Container } from '../components';
import theme from '../theme';


class SearchRepoScreen extends Component {
  constructor(props) {
    super(props);
  }
  

  componentDidMount() {
    this.props.searchRepos();
  }

  render() {
    return (
      <Container>
        <Text> SearchRepoScreen </Text>
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