import {StatusBar} from 'expo-status-bar';
import axios from "axios";
import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Alert,
    Picker,
    View
} from 'react-native';
import styled from "styled-components";
import DocumentPicker from 'react-native-document-picker';
import DatePicker from 'react-native-datepicker'

const imgUpload = async () => {
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.images],
        });
        console.log(
            res.uri,
            res.type, // mime type
            res.name,
            res.size
        );
        console.log(res);
    } catch (err) {
        console.log(err)
    }
}

export default function SignupScreen({navigation}) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [gender, setGender] = useState('M');
    const [date, setDate] = useState('2002-01-01');

    const login = () => {
        axios.post('http://10.0.2.2:8000/api/users/signup', {
            username: username,
            email: email,
            password2: password2,
            password: password,
            gender: gender,
            birth_date: date
        }).then(function (response) {
            Alert.alert(
                'signup successfully','',
                [{
                    text: 'cancel',
                    onPress: () => console.log('canceled')
                }, {
                    text: 'ok',
                    onPress: () => navigation.navigate('Login')
                }]
            )
        }).catch(function (error) {
            alert(error);
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <StatusBar style="auto"/>
                <View style={{height: 30}}></View>
                <Input placeholder="username." placeholderTextColor="#003f5c"
                       onChangeText={(username) => setUsername(username)}/>
                <Input placeholder="email" placeholderTextColor="#003f5c"
                       onChangeText={(email) => setEmail(email)}/>
                <Input placeholder="Password." placeholderTextColor="#003f5c"
                       secureTextEntry={true} onChangeText={(password) => setPassword(password)}/>
                <Input placeholder="confirm password" placeholderTextColor="#003f5c"
                       secureTextEntry={true} onChangeText={(password2) => setPassword2(password2)}/>
                <View>
                    <Text style={{color: '#fff', fontSize: 20, margin: 5}}>Select your birth date :</Text>
                    <DatePicker placeholder="Birth date" style={{width: 300}}
                                format="YYYY-MM-DD" maxDate="2009-01-01" confirmBtnText="Confirm"
                                cancelBtnText="Cancel" date={date} onDateChange={(date) => setDate(date)}/>
                </View>
                <View style={{width: 300, marginTop: 10}}>
                    <Text style={{color: '#fff', fontSize: 20}}>Select your gender :</Text>
                    <Picker selectedValue={gender} onValueChange={(user) => setGender(user)}>
                        <Picker.Item label='Male' value='M'/>
                        <Picker.Item label='Female' value='F'/>
                    </Picker>
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={imgUpload}>
                    <Text style={styles.loginText}>Upload Img</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn} onPress={login}>
                    <Text style={styles.loginText}>Sign up</Text>
                </TouchableOpacity>
            </ScrollView>
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
        width: "100%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#1b1c1b",
    }, loginText: {
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
