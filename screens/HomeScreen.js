import React, {useEffect, useState} from 'react';
import {View, Text, Button, SafeAreaView, StyleSheet, ScrollView, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import {StatusBar} from "expo-status-bar";

const getMyStringValue = async () => {
    try {
        return await AsyncStorage.getItem('token')
    } catch (e) {
        console.log(e)
    }
}
let value;
getMyStringValue().then((val) => {
    value = JSON.parse(val);
}).catch((err) => {
    console.log(err)
})

export default function HomeScreen() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get('http://10.0.2.2:8000/api/posts/', {
            headers: {
                Authorization: `Token ${value}`,
            }
        }).then((res) => {
            setPosts(res.data)
        }).catch((err) => {
            alert(err)
        })
    }, [])

    if (posts) {
        return (
            <SafeAreaView style={styles.container}>
                {posts.map((data) => {
                    return (
                        <View style={styles.post}>
                            {data.poster_ID.profileImg ? (
                                <Image style={styles.tinyLogo}
                                       source={{
                                           uri: `http://10.0.2.2:8000${data.poster_ID.prfileImg}`,
                                       }}
                                />
                            ) : (
                                <Image style={styles.tinyLogo}
                                       source={require('../assets/imgs/default_img.png')}
                                />
                            )}
                            <Text style={styles.text}>{data.poster_ID.username}</Text>
                            <Text style={styles.text}>{data.Time}</Text>
                            <View style={styles.postInfo}>
                                <Text style={styles.text}>{data.content}</Text>
                            </View>
                            {data.postImg && (
                                <Image style={styles.postImg}
                                       source={{
                                           uri: `http://10.0.2.2:8000${data.postImg}`,
                                       }}
                                />)}
                        </View>
                    )
                })}
            </SafeAreaView>
        )
    } else {
        return (
            <View>
                <Text style={{color: 'red'}}>
                    you have no posts
                </Text>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212020FF',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#212020',
    }, post: {
        width: '100%',
        backgroundColor: '#111111FF',
        padding: 5,
        margin: 3
    }, tinyLogo: {
        width: 25,
        height: 25,
    }, text: {
        color: '#fff'
    }, postImg: {
        height: 200,
        borderRadius: 10,
    },postInfo: {
        alignItems: 'center',
        margin: 5
    }
});
