import { StatusBar } from 'expo-status-bar';
import axios from "axios";
import React, {useState} from 'react';
import { StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import styled from "styled-components";
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('token', value)
    } catch (e) {
        console.log(e)
    }
}

export default function App({navigation}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        axios.post('http://10.0.2.2:8000/api/users/login',{
            username: username,
            password: password
        }).then(function (response) {
            console.log(JSON.stringify(response.data.token));
            if(response.data.token){
                storeData(JSON.stringify(response.data.token)).then(()=>console.log('done'))
            }
            Alert.alert(
                'Login successfully',
                `you will redirect to news feed page`,
                [{
                    text: 'cancel',
                    onPress: () => console.log('canceled')
                },
                    {
                        text: 'ok',
                        onPress: () => navigation.navigate('Home')
                    }
                ]
            )
        }).catch(function (error) {
            alert(error);
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <HeaderText style={{fontSize: 30}}>Login</HeaderText>
            <Input placeholder="username." placeholderTextColor="#003f5c"
                   onChangeText={(username) => setUsername(username)} />
            <Input placeholder="Password." placeholderTextColor="#003f5c"
                   secureTextEntry={true} onChangeText={(password) => setPassword(password)} />
            <TouchableOpacity style={styles.loginBtn} onPress={login}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#252625',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginBtn: {
        width:"80%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        backgroundColor:"#1b1c1b",
    },loginText:{
        color: '#fff',
        fontSize: 20,
    }
});

const Input = styled.TextInput`
  font-size: 20px;
  background-color: white;
  width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const HeaderText = styled.Text`
  color: white;
  font-size: 20px;
  margin-bottom: 50px;
`;
