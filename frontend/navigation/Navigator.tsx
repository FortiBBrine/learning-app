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
import {useTranslation} from "react-i18next";
import CalendarScreen from "../screens/CalendarScreen";
import AddRelationScreen from "../screens/AddRelationScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TuneScreen from "../screens/TuneScreen";

export type RootStackParamList = {
    Home: undefined;
    Profile: { person: RelationDto, addButton: boolean };
    Login: undefined;
    Register: undefined;
    Calendar: undefined;
    AddRelationScreen: undefined;
    Tune: undefined;
}

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">
export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Profile">
export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">
export type AddRelationScreenNavigationProp = StackNavigationProp<RootStackParamList, "AddRelationScreen">

export type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Profile">

const Stack = createStackNavigator<RootStackParamList>()

const Navigator = () => {

    const token = useAppSelector(state => state.login.token)
    const dispatch = useDispatch()

    const [t, i18n] = useTranslation()

    useEffect(() => {
        AsyncStorage.getItem("token")
            .then(data => dispatch(setToken(data)))
            .catch(err => console.error(err));
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator>
                { token !== null ?
                    <>
                        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
                        <Stack.Screen options={{headerTitle: t("profile")}} name="Profile" component={ProfileScreen} />
                        <Stack.Screen options={{headerTitle: t("calendar")}} name="Calendar" component={CalendarScreen} />
                        <Stack.Screen options={{headerTitle: t("add")}} name="AddRelationScreen" component={AddRelationScreen} />
                        <Stack.Screen options={{headerShown: false}} name="Tune" component={TuneScreen} />
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