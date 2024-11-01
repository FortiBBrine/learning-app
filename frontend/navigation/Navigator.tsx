import React, {useEffect} from 'react';
import {NavigationContainer, RouteProp} from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import {Person} from "../store/slice/peopleSlice";
import {createStackNavigator, StackNavigationProp} from "@react-navigation/stack";
import {useAppSelector} from "../store/store";
import {useDispatch} from "react-redux";
import {setToken} from "../store/slice/loginSlice";

export type RootStackParamList = {
    Home: undefined;
    Profile: { person: Person };
    Login: undefined;
}

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">
export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Profile">
export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">

export type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">
export type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Profile">
export type LoginScreenRouteProp = RouteProp<RootStackParamList, "Login">

const Stack = createStackNavigator<RootStackParamList>()

const Navigator = () => {

    const token = useAppSelector(state => state.login.token)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setToken(null))
        // AsyncStorage.getItem("token")
        //     .then(data => dispatch(setToken(data)))
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator>
                { token != null ?
                    <>
                        <Stack.Screen options={{headerTitle: "Вчителі / Учні"}} name="Home" component={HomeScreen} />
                        <Stack.Screen options={{headerTitle: "Профіль"}} name="Profile" component={ProfileScreen} />
                    </> :
                    <>
                        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;