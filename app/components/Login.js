'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard
} from 'react-native';
import { Container, Toast, Header, Title, Text, View } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
window.btoa = require('Base64').btoa;
const Octokat = require('octokat');

export default class Login extends Component {
    static navigationOptions = {
        title: 'Login',
        header: null
    };
    constructor () {
        super();
        this.state = {
            email: '',
            _csrf: '',
            password: ''
        }
    }
    componentDidMount() {
        setTimeout(() => {
            SplashScreen.hide();
        }, 2000);
    }
    componentWillMount() {}
    doLogin() {
        const { navigate } = this.props.navigation;
        Keyboard.dismiss();
        const octo = new Octokat({
            username: this.state.email,
            password: this.state.password
        });

        octo.user.repos.fetch((err, repos) => {
            if(err) {
                console.log(err);
                Toast.show({
                    text: 'please give correct input',
                    position: 'bottom',
                    type: 'danger',
                    duration: 2000
                })
            } else {
                console.log('repos', repos);
                navigate('Dashboard', { octo, repos });
            }
        })

    }
    handleEmailChange = email => {
        this.setState({ email });
    };

    handlePasswordChange = password => {
        this.setState({ password });
    };
  render() {
    return (
        <Container style={{backgroundColor:'#FFF'}}>
            <Header style={{backgroundColor:'#FFF'}}>
                <Title style={{color:'#000000', marginTop:20}}>Login</Title>
            </Header>
            <View style={styles.container} />
            <View style={styles.wrapper}>
                <View style={styles.inputWrap}>
                    <TextInput
                        placeholder='enter your userId'
                        style={styles.input}
                        value={this.state.email}
                        onChangeText={this.handleEmailChange}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <TextInput
                        placeholder='enter password'
                        style={styles.input}
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={this.handlePasswordChange}
                    />
                </View>
                <TouchableOpacity style={styles.button} activeOpacity = {.5} onPress={this.doLogin.bind(this)}>
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container} />
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
      width: null,
      height: null
  },
  inputWrap: {
      flexDirection: 'row',
      marginVertical: 10,
      height: 40,
      backgroundColor: 'transparent'
  },
  input: {
      flex: 1,
      paddingHorizontal: 10,
      backgroundColor: '#FFF'
  },
  wrapper: {
      paddingHorizontal: 15
  },
    button: {
        backgroundColor: '#d73552',
        paddingVertical: 15,
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18
    }
});

AppRegistry.registerComponent('Login', () => Login);
