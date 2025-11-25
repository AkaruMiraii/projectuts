import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@react-native-vector-icons/ionicons";

import Login from "./screens/Login";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import FavoritesScreen from "./screens/FavoritesScreen";

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Ionicons name="home-outline" size={24} color={'#795548'} />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: () => <Ionicons name="heart-outline" size={24} color={'#795548'} />,
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="LoginScreen" component={LoginScreen} />
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="MainTab" component={MainTab} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;