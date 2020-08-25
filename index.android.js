'use strict'

import React, { Component } from 'react';
import { AppRegistry, Text, View, Button } from 'react-native';
import { Root } from "native-base";
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { Provider, connect } from "react-redux";
import Login from './app/components/Login';
import Dashboard from './app/components/Dashboard';
import Commits from './app/components/Commits';
import getStore from "./app/store";


const Routes = {
    Login: { screen: Login },
    Dashboard: { screen: Dashboard },
    Commits: { screen: Commits }
};

const AppNavigator = StackNavigator(Routes);

const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

@connect(state => ({
    nav: state.nav
}))

class AppWithNavigationState extends Component {
    render() {
        return (
            <Root>
                <AppNavigator
                    navigation={addNavigationHelpers({
                        dispatch: this.props.dispatch,
                        state: this.props.nav
                    })}
                />
            </Root>
        );
    }
}

const store = getStore(navReducer);

const App = () => {
    return (
        <Provider store={store}>
            <AppWithNavigationState />
        </Provider>
    );
}

AppRegistry.registerComponent("Github", () => App);
