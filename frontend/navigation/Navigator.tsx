import React from 'react';
import {NavigationContainer, RouteProp} from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import {Person} from "../store/slice/peopleSlice";
import {createStackNavigator, StackNavigationProp} from "@react-navigation/stack";
import {useAppSelector} from "../store/store";

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

    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)

    return (
        <NavigationContainer>
            <Stack.Navigator>
                { isLoggedIn ?
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