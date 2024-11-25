import React, {useEffect} from 'react';
import {NavigationContainer, RouteProp} from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import {createStackNavigator, StackNavigationProp} from "@react-navigation/stack";
import {useAppSelector} from "../store/store";
import {useDispatch} from "react-redux";
import {setToken} from "../store/slice/loginSlice";
import RegisterScreen from "../screens/RegisterScreen";
import {RelationDto} from "../api/relationApi";

export type RootStackParamList = {
    Home: undefined;
    Profile: { person: RelationDto };
    Login: undefined;
    Register: undefined;
}

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">
export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Profile">
export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">
export type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, "Register">

export type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">
export type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Profile">
export type LoginScreenRouteProp = RouteProp<RootStackParamList, "Login">
export type RegisterScreenRouteProp = RouteProp<RootStackParamList, "Register">

const Stack = createStackNavigator<RootStackParamList>()

const Navigator = () => {

    const token = useAppSelector(state => state.login.token)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setToken(null))
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator>
                { token != null ?
                    <>
                        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
                        <Stack.Screen options={{headerTitle: "Профіль"}} name="Profile" component={ProfileScreen} />
                    </> :
                    <>
                        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
                        <Stack.Screen options={{headerShown: false}} name="Register" component={RegisterScreen} />
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;