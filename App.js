import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View, Button} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen'
import Icon from 'react-native-vector-icons/Ionicons';

const HomeStack = createStackNavigator();
const SingInStack = createStackNavigator();
const signUpStack = createStackNavigator();

const SignInStackScreen = ({navigation}) => {
    return (
        <SingInStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#1b1c1b'
            },
            headerTintColor: '#fff',
            headerTintStyle: {
                fontWeight: 'bold'
            }
        }}>
            <SingInStack.Screen name="Login" component={SignInScreen} options={{
                headerLeft: () => (
                    <Icon.Button name='ios-menu' size={25}
                                 backgroundColor='#1b1c1b' onPress={()=>navigation.openDrawer()}></Icon.Button>)
            }}/>
        </SingInStack.Navigator>
    )
}

const SignUpStackScreen = ({navigation}) => {
  return (
    <signUpStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#1b1c1b'
        },
        headerTintColor: '#fff',
        headerTintStyle: {
          fontWeight: 'bold'
        }
      }}>
        <signUpStack.Screen name="Signup" component={SignupScreen} options={{
          headerLeft: () => (
          <Icon.Button name='ios-menu' size={25}
          backgroundColor='#1b1c1b' onPress={()=>navigation.openDrawer()}></Icon.Button>)
        }}/>
      </signUpStack.Navigator>
  )
}

const HomeStackScreen = ({navigation}) => {
    return (
        <HomeStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#1b1c1b'
            },
            headerTintColor: '#fff',
            headerTintStyle: {
                fontWeight: 'bold'
            }
        }}>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{
                headerLeft: () => (
                    <Icon.Button name='ios-menu' size={25}
                                 backgroundColor='#1b1c1b' onPress={()=>navigation.openDrawer()}></Icon.Button>)
            }}/>
        </HomeStack.Navigator>
    )
}


const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
          <Drawer.Screen name="Login" component={SignInStackScreen} />
          <Drawer.Screen name="SignUp" component={SignUpStackScreen} />
          <Drawer.Screen name="Home" component={HomeStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
