'use strict'

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Container, View, List, Icon, Text, Card, CardItem } from "native-base";
import { setUser } from '../actions';
const _ = require('lodash');
import SplashScreen from 'react-native-splash-screen';

class Commits extends Component {
    static navigationOptions = {
        title: 'Commits'
    };
    constructor() {
        super();
        this.state = {
            completeLoad: false,
            refreshing: false,
            octo: {},
            commits: []
        }
    }

    componentWillMount() {
        this.getCommits();
    }

    getCommits () {
        const { octo, fullName } = this.props.navigation.state.params;
        console.log('fullName', fullName);
        octo.repos(fullName).commits.fetch((err, commits) => {
            if (err) {
                this.setState({
                    completeLoad: true
                })
                console.log('err', err);
            } else {
                this.setState({
                    octo,
                    commits: commits.items,
                    refreshing: false,
                    completeLoad: true
                })
            }
        })
    }

    componentDidMount() { }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.getCommits();
    }

    render() {
        const { navigate } = this.props.navigation;
        console.log('commits', this.state.commits);
        if (_.isEmpty(this.state.commits) && this.state.completeLoad) {
            return (<View>
                <Text>No Commits</Text>
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
                    <List dataArray={this.state.commits}
                        style={{ marginVertical: 10 }}
                        renderRow={(item) =><View>
                            <Card style={{ backgroundColor: '#E5E4E2' }}>
                                <CardItem>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                    }}>
                                        <View style={{ backgroundColor: '#E5E4E2', padding: 8 }}>
                                            <Text>message</Text>
                                            <Text style={styles.rightText}>{item.commit.message}</Text>
                                        </View>
                                        <View style={{ backgroundColor: '#E5E4E2', padding: 8 }}>
                                            <Text>author name</Text>
                                            <Text style={styles.rightText}>{item.commit.author.name}</Text>
                                        </View>
                                        <View style={{ backgroundColor: '#E5E4E2', padding: 8 }}>
                                            <Text>author email</Text>
                                            <Text style={styles.rightText}>{item.commit.author.email}</Text>
                                        </View>
                                        <View style={{ backgroundColor: '#E5E4E2', padding: 8 }}>
                                            <Text>date</Text>
                                            <Text style={styles.rightText}>{item.commit.author.date}</Text>
                                        </View>
                                    </View>
                                </CardItem>
                            </Card>
                        </View>
                        }>
                    </List>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    rightText: {
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: '#000',
        backgroundColor: '#E5E4E1', textAlign: 'right'
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
)(Commits)
