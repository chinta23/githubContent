'use strict'

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Container, View, List, Button, Text } from "native-base";
import { setUser } from '../actions';
const _ = require('lodash');

class dashboard extends Component {
    static navigationOptions = {
        title: 'Dashboard'
    };
    constructor() {
        super();
        this.state = {
            completeLoad: false,
            refreshing: false,
            repositories: [],
            octo: {}
        }
    }

    componentWillMount() {
        const { octo, repos } = this.props.navigation.state.params;
        this.setState({
            repositories: repos.items,
            octo,
            completeLoad: true
        });
        this.props.setUser({name: repos.items[0].owner.login});
    }

    componentDidMount() {}

    _onRefresh() {
        this.setState({ refreshing: true },
        () => {
            this.setState({
                refreshing: false
            })
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        if (_.isEmpty(this.state.repositories) && this.state.completeLoad) {
            return (<View>
                <Text>No repositories</Text>
            </View>)
        }
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
            >

                <View>
                    <List dataArray={this.state.repositories}
                        style={{ marginVertical: 10 }}
                        renderRow={(item) =>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                            }}>
                                <View style={styles.repos}>
                                    < TouchableOpacity
                                        onPress={() => navigate('Commits', { octo: this.state.octo, fullName: item.fullName })}
                                    >
                                        <Text style={{ color: '#3366BB' }}>{item.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }>
                    </List>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  repos: {
      backgroundColor: '#E5E4E2',
      marginVertical: 2,
      padding: 8
  }
});

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setUser: (user) => dispatch(setUser(user))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(dashboard)
