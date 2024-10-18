
import {createStackNavigator, StackNavigationProp} from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import {NavigationContainer, RouteProp} from "@react-navigation/native";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {PaperProvider} from "react-native-paper";
import {Person} from "./store/slice/peopleSlice";
import ProfileScreen from "./screens/ProfileScreen";

export type RootStackParamList = {
  Home: undefined;
  Profile: { person: Person }
}

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">
export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Profile">

export type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">
export type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Profile">

const Stack = createStackNavigator<RootStackParamList>()

export default function App() {
  return (
      <Provider store={store}>
          <PaperProvider>
              <NavigationContainer>
                  <Stack.Navigator initialRouteName={"Home"}>
                      <Stack.Screen options={{headerTitle: "Вчителі / Учні"}} name="Home" component={HomeScreen} />
                      <Stack.Screen options={{headerTitle: "Профіль"}} name="Profile" component={ProfileScreen} />
                  </Stack.Navigator>
              </NavigationContainer>
          </PaperProvider>
      </Provider>
  );
}
